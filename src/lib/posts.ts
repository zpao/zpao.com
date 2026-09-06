import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkSmartypants from 'remark-smartypants';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import { visit } from 'unist-util-visit';
import Prism from 'prismjs';
import { imageInfo, variantName } from './images.ts';
import { readGist } from './gists.ts';
import loadLanguages from 'prismjs/components/index.js';
loadLanguages(['bash', 'ruby', 'python', 'diff', 'json', 'css']);

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

type GistLoader = (identifier: string) => Promise<string>;

function enhancements({
  slug,
  name,
  gistLoader,
}: Pick<RenderablePost, 'slug' | 'name'> & { gistLoader: GistLoader }) {
  return async (tree: any) => {
    const images: Promise<void>[] = [];
    visit(
      tree,
      'image',
      (node: any, index: number | undefined, parent: any) => {
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
      },
    );
    await Promise.all(images);
    const gists: Promise<void>[] = [];
    visit(
      tree,
      'inlineCode',
      (node: any, _index: number | undefined, parent: any) => {
        if (!node.value.startsWith('gist:')) return;
        const identifier = node.value.slice(5);
        gists.push(
          (async () => {
            const html = await gistLoader(identifier);
            // A gist is block HTML, so replace its otherwise-empty paragraph too.
            const target =
              parent.type === 'paragraph' && parent.children.length === 1
                ? parent
                : node;
            target.type = 'html';
            target.value = html;
            delete target.children;
          })(),
        );
      },
    );
    await Promise.all(gists);
    visit(tree, 'code', (node: any) => {
      const match = /^(\w+)?(?:\{([\d,-]+)\})?$/.exec(node.lang || '');
      const language = match?.[1] || 'text';
      const selected = new Set<number>();
      for (const range of (match?.[2] || '').split(',').filter(Boolean)) {
        const [start, end = start] = range.split('-').map(Number);
        for (let n = start; n <= end; n++) selected.add(n);
      }
      const grammar = Prism.languages[language];
      const escaped = node.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const code = grammar
        ? Prism.highlight(node.value, grammar, language)
        : escaped;
      node.type = 'html';
      node.value = `<div class="gatsby-highlight"><pre class="language-${language}"><code class="language-${language}">${code
        .split('\n')
        .map((line: string, i: number, lines: string[]) =>
          selected.has(i + 1)
            ? `<span class="gatsby-highlight-code-line">${line}</span>`
            : line + (i < lines.length - 1 ? '\n' : ''),
        )
        .join('')}</code></pre></div>`;
    });
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
      .use(enhancements as any, { ...post, gistLoader })
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
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
