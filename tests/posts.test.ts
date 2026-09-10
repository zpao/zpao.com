import fs from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getPosts, renderPost } from '../src/lib/posts.ts';

test('all posts have stable unique URLs and descending dates', async () => {
  const posts = await getPosts();
  assert.equal(
    posts.length,
    (await fs.readdir('src/content/posts', { withFileTypes: true })).filter(
      (entry) => entry.isDirectory(),
    ).length,
  );
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  assert.ok(posts.every((post) => post.slug === `/posts/${post.name}/`));
  assert.deepEqual(
    posts.map((post) => post.date),
    posts
      .map((post) => post.date)
      .sort()
      .reverse(),
  );
});
test('Markdown retains HTML, local images, typography, gists, and highlighted lines', async () => {
  const { html } = await renderPost(
    {
      slug: '/posts/test/',
      content:
        '![alt](./image.png)\n\n"smart" -- test\n\n<iframe src="https://example.com"></iframe>\n\n`gist:zpao/844787#assignment_array.js`\n\n```javascript {2}\nconst a = 1;\nconst b = 2;\n```',
    },
    {
      gistLoader: async (identifier: string) =>
        `<div class="gist">${identifier}</div>`,
    },
  );
  assert.match(html, /src="\/posts\/test\/image.png"/);
  assert.match(html, /“smart”/);
  assert.match(html, /<iframe src="https:\/\/example.com"/);
  assert.match(html, /844787#assignment_array.js/);
  assert.match(html, /highlight-line/);
  assert.match(html, /class="token keyword"/);
});

test('embedded tables are normalized for browser hydration', async () => {
  const { html } = await renderPost(
    { slug: '/posts/test/', content: '`gist:zpao/5557101`' },
    {
      gistLoader: async () =>
        '<div class="gist"><table><tr><td>code</td></tr></table></div>',
    },
  );
  assert.match(html, /<table><tbody><tr>/);
  assert.ok(
    !html.includes('<p><div'),
    'Gists must not be nested in paragraphs',
  );
});
