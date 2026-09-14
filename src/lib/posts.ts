import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkSmartypants from 'remark-smartypants';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import rehypePrism from 'rehype-prism-plus/common';
import { visit } from 'unist-util-visit';
import type { Root as HastRoot } from 'hast';
import type { Root as MdastRoot } from 'mdast';
import { imageInfo, variantName } from './images.ts';
import { readGist, type Gist } from './gists.ts';

export const postsDirectory = path.join(process.cwd(), 'src/content/posts');
export { site } from './site.ts';

export type Post = {
  title: string;
  date: string;
  displayDate: string;
  name: string;
  slug: string;
  content: string;
  blurb?: string;
  type?: string;
  source_url?: string;
  tags?: string[];
  old_permalink?: string;
};

export type RenderablePost = Pick<Post, 'slug' | 'content'> &
  Partial<Omit<Post, 'slug' | 'content'>>;

export type RenderedPost<T extends RenderablePost = RenderablePost> = T & {
  html: string;
  excerpt: string;
};

export async function getPosts(): Promise<Post[]> {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async ({ name }) => {
        const { data, content } = matter(
          await fs.readFile(
            path.join(postsDirectory, name, 'index.md'),
            'utf8',
          ),
        );
        const date = new Date(data.date).toISOString();
        return {
          ...data,
          title: String(data.title ?? name),
          date,
          displayDate: date.slice(0, 10),
          name,
          slug: `/posts/${name}/`,
          content,
        };
      }),
  );
  return posts.sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  );
}

type GistLoader = (identifier: string) => Promise<Gist>;
type HtmlNode = { type: 'html'; value: string; children?: unknown };

function codeMetadata() {
  return (tree: MdastRoot) => {
    visit(tree, 'code', (node) => {
      if (!node.meta) return;
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, metastring: node.meta },
      };
    });
  };
}

function restoreCodeMetadata() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node) => {
      const meta = node.properties?.metastring;
      if (node.tagName !== 'code' || typeof meta !== 'string') return;
      node.data = { ...node.data, meta };
      delete node.properties.metastring;
    });
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderGist(gist: Gist) {
  return `<div class="gist">${gist.files
    .map((file) => {
      const language =
        file.language?.toLowerCase().replace(/\s+/g, '-') || 'text';
      return `<div class="gist-file"><pre><code class="language-${escapeHtml(language)}">${escapeHtml(file.content)}</code></pre><div class="gist-meta"><a href="${escapeHtml(file.rawUrl)}">view raw</a> <a href="${escapeHtml(gist.url)}">${escapeHtml(file.filename)}</a> hosted with ❤ by <a href="https://github.com">GitHub</a></div></div>`;
    })
    .join('')}</div>`;
}

function enhancements({
  slug,
  name,
  gistLoader,
}: Pick<RenderablePost, 'slug' | 'name'> & { gistLoader: GistLoader }) {
  return async (tree: MdastRoot) => {
    const images: Promise<void>[] = [];
    visit(tree, 'image', (node, index, parent) => {
      if (index === undefined || !parent) return;
      if (/^(?:[a-z]+:|\/|#)/i.test(node.url)) return;
      const file = node.url.replace(/^\.\//, '');
      node.url = slug + file;
      if (!name) return;
      images.push(
        (async () => {
          const info = await imageInfo(path.join(postsDirectory, name, file));
          if (parent.type !== 'link')
            parent.children[index] = {
              type: 'link',
              url: node.url,
              children: [node],
            };
          if (info)
            node.data = {
              hProperties: {
                width: Math.min(info.width, 700),
                height: Math.round(
                  (info.height * Math.min(info.width, 700)) / info.width,
                ),
                srcSet: info.widths
                  .map(
                    (width) => `${slug}${variantName(file, width)} ${width}w`,
                  )
                  .join(', '),
                sizes: '(max-width: 800px) 92vw, 700px',
                loading: 'lazy',
                decoding: 'async',
              },
            };
        })(),
      );
    });
    await Promise.all(images);
    const gists: Promise<void>[] = [];
    visit(tree, 'inlineCode', (node, _index, parent) => {
      if (!node.value.startsWith('gist:')) return;
      if (!parent) return;
      const identifier = node.value.slice(5);
      gists.push(
        (async () => {
          const html = renderGist(await gistLoader(identifier));
          // A gist is block HTML, so replace its otherwise-empty paragraph too.
          const target = (parent.type === 'paragraph' &&
          parent.children.length === 1
            ? parent
            : node) as unknown as HtmlNode;
          target.type = 'html';
          target.value = html;
          delete target.children;
        })(),
      );
    });
    await Promise.all(gists);
  };
}

export async function renderPost<T extends RenderablePost>(
  post: T,
  { gistLoader = readGist }: { gistLoader?: GistLoader } = {},
): Promise<RenderedPost<T>> {
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkSmartypants)
      .use(enhancements, { ...post, gistLoader })
      .use(codeMetadata)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(restoreCodeMetadata)
      .use(rehypePrism, { ignoreMissing: true, defaultLanguage: 'text' })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(post.content),
  );
  return {
    ...post,
    html,
    excerpt: post.content
      .replace(/<[^>]*>/g, '')
      .replace(/[#*_`\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160),
  };
}
