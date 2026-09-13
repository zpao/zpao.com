import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { htmlToDOM } from 'html-react-parser';
import type { DOMNode } from 'html-react-parser';
import { getPosts } from '../src/lib/posts.ts';
import { createHtaccess } from '../src/lib/htaccess.ts';

const posts = await getPosts();
const routes = ['/', '/about/', '/posts/', ...posts.map((post) => post.slug)];
const archive = await fs.readFile('out/posts/index.html', 'utf8');
for (const route of routes) {
  const file = path.join('out', route, 'index.html');
  const html = await fs.readFile(file, 'utf8');
  // App Router navigation must work from static files on DreamHost.
  await fs.access(path.join('out', route, 'index.txt'));
  assert.match(html, /<title[^>]*>Paul O/);
  assert.ok(
    !html.includes('<template'),
    `Inert GitHub template must not be hydrated: ${route}`,
  );
  assert.ok(
    !html.includes('api/image'),
    `Unexpected image service in ${route}`,
  );
  const visit = async (nodes: DOMNode[]) => {
    for (const node of nodes) {
      if (!('attribs' in node)) continue;
      const attrs = node.attribs || {};
      // Validate generated script, stylesheet, image, and srcset paths.
      const urls: Array<string | undefined> = [
        attrs.src,
        node.name === 'link' && attrs.rel === 'stylesheet'
          ? attrs.href
          : undefined,
      ];
      if (attrs.srcset)
        urls.push(
          ...attrs.srcset.split(',').map((part) => part.trim().split(' ')[0]),
        );
      for (const url of urls.filter(
        (url): url is string =>
          typeof url === 'string' &&
          url.startsWith('/') &&
          !url.startsWith('//'),
      )) {
        await fs.access(
          path.join('out', decodeURIComponent(url.split('?')[0])),
        );
      }
      if ('children' in node && node.children)
        await visit(node.children as DOMNode[]);
    }
  };
  await visit(htmlToDOM(html));
}
for (const post of posts)
  assert.ok(
    archive.includes(`href="${post.slug}"`),
    `Missing archive entry: ${post.slug}`,
  );
assert.equal(await fs.readFile('out/.htaccess', 'utf8'), createHtaccess(posts));
const notFound = await fs.readFile('out/404.html', 'utf8');
assert.match(notFound, /404 \/ NOT FOUND/);
assert.ok(notFound.includes('Nice Try 1337 H4xx0R!'));
for (const name of ['default', 'mozilla']) {
  const xml = await fs.readFile(`out/feeds/${name}.xml`, 'utf8');
  const expected = posts.filter(
    (post) =>
      name === 'default' ||
      post.tags?.some((tag) => tag.toLowerCase() === name),
  );
  assert.equal((xml.match(/<item>/g) || []).length, expected.length);
  for (const post of expected)
    assert.ok(xml.includes(`https://zpao.com${post.slug}`));
}
async function checkPublic(directory = 'public') {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) await checkPublic(source);
    else
      assert.deepEqual(
        await fs.readFile(path.join('out', path.relative('public', source))),
        await fs.readFile(source),
      );
  }
}
await checkPublic();
const cssFiles = await fs.readdir('out/_next/static/css');
const css = (
  await Promise.all(
    cssFiles.map((file) => fs.readFile(`out/_next/static/css/${file}`, 'utf8')),
  )
).join('\n');
assert.ok(!css.includes('@stylex;'), 'StyleX was not compiled');
assert.match(css, /#f92672/);
assert.match(css, /max-width:600px/);
assert.match(css, /border-bottom/);
console.log(
  `Verified ${routes.length} routes, ${posts.length} archive entries, local assets, both feeds, public files, Apache rules, and compiled StyleX.`,
);
