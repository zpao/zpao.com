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
      gistLoader: async (identifier: string) => ({
        url: `https://gist.github.com/${identifier}`,
        files: [
          {
            filename: 'assignment_array.js',
            language: 'JavaScript',
            content: 'const gist = true;',
            rawUrl: 'https://gist.githubusercontent.com/example/raw',
          },
        ],
      }),
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
  const { html } = await renderPost({
    slug: '/posts/test/',
    content: '<table><tr><td>code</td></tr></table>',
  });
  assert.match(html, /<table><tbody><tr>/);
  assert.ok(
    !html.includes('<p><div'),
    'Gists must not be nested in paragraphs',
  );
});

test('GitHub Gist files become Prism-highlighted code blocks', async () => {
  const { html } = await renderPost(
    { slug: '/posts/test/', content: '`gist:zpao/123`' },
    {
      gistLoader: async () => ({
        url: 'https://gist.github.com/zpao/123',
        files: [
          {
            filename: 'example.js',
            language: 'JavaScript',
            content: 'const answer = 42;\nconsole.log(answer);',
            rawUrl:
              'https://gist.githubusercontent.com/zpao/123/raw/example.js',
          },
        ],
      }),
    },
  );
  assert.match(html, /<pre class="language-javascript">/);
  assert.match(html, /class="token keyword">const<\/span>/);
  assert.match(html, /console<span class="token punctuation">\.<\/span>/);
  assert.match(html, /<span class="token function">log<\/span>/);
  assert.match(html, /href="https:\/\/gist\.github\.com\/zpao\/123"/);
  assert.match(html, />view raw<\/a>/);
  assert.match(html, />example\.js<\/a>/);
});
