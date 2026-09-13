import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHtaccess } from '../src/lib/htaccess.ts';

test('DreamHost rules retain HTTPS, 404, and literal legacy redirects', () => {
  const rules = createHtaccess([
    { old_permalink: '/articles/a.b', slug: '/posts/example/' },
    { slug: '/posts/new/' },
  ]);
  assert.match(rules, /RewriteCond %\{HTTPS\} off/);
  assert.ok(
    rules.includes('RewriteRule ^(.*)$ https://zpao.com/$1 [R=301,L]'),
  );
  assert.match(rules, /ErrorDocument 404 \/404.html/);
  assert.ok(
    rules.includes('RewriteRule ^articles/a\\.b$ /posts/example/ [R=301,NC,L]'),
  );
  assert.equal(
    rules.split('\n').filter((line) => line.includes('R=301')).length,
    2,
  );
});
