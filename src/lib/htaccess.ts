import type { Post } from './posts.ts';

export function createHtaccess(posts: Pick<Post, 'old_permalink' | 'slug'>[]) {
  return [
    'RewriteEngine On',
    'RewriteBase /',
    'RewriteCond %{HTTPS} off',
    'RewriteRule ^(.*)$ https://zpao.com/$1 [R=301,L]',
    'ErrorDocument 404 /404.html',
    ...posts
      .filter((post): post is typeof post & { old_permalink: string } =>
        Boolean(post.old_permalink),
      )
      .map((post) => {
        // Per-directory Apache patterns never receive a leading slash.
        const source = post.old_permalink
          .replace(/^\/+/, '')
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return `RewriteRule ^${source}$ ${post.slug} [R=301,NC,L]`;
      }),
    '',
  ].join('\n');
}
