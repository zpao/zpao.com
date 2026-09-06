import fs from 'node:fs/promises';
import path from 'node:path';
import RSS from 'rss';
import sharp from 'sharp';
import { prepareGists } from '../src/lib/gists.ts';
import { imageInfo, variantName } from '../src/lib/images.ts';
import {
  getPosts,
  renderPost,
  postsDirectory,
  site,
} from '../src/lib/posts.ts';
import { createHtaccess } from '../src/lib/htaccess.ts';

// public is generated input to Next; out is the deployable export.
await fs.rm('public', { recursive: true, force: true });
await fs.cp('static', 'public', { recursive: true });
const sourcePosts = await getPosts();
await prepareGists(sourcePosts);
const posts = await Promise.all(sourcePosts.map((post) => renderPost(post)));
for (const post of posts) {
  const dir = path.join(postsDirectory, post.name);
  for (const file of await fs.readdir(dir)) {
    if (file.endsWith('.md')) continue;
    const destination = path.join('public', post.slug, file);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.cp(path.join(dir, file), destination, { recursive: true });
    if (/\.(png|jpe?g)$/i.test(file)) {
      const info = await imageInfo(path.join(dir, file));
      if (info)
        for (const width of info.widths) {
          await sharp(path.join(dir, file))
            .resize({ width, withoutEnlargement: true })
            .webp()
            .toFile(
              path.join(path.dirname(destination), variantName(file, width)),
            );
        }
    }
  }
}
await fs.writeFile('public/.htaccess', createHtaccess(posts));
await fs.mkdir('public/feeds', { recursive: true });
for (const name of ['default', 'mozilla']) {
  const feed = new RSS({
    title: `${site.title} - ${site.subtitle}`,
    generator: '',
    feed_url: `${site.url}/feeds/${name}.xml`,
    site_url: site.url,
  });
  for (const post of posts.filter(
    (post) => name === 'default' || post.tags?.includes('mozilla'),
  )) {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: site.url + post.slug,
      guid: site.url + post.slug,
      author: site.author,
      date: post.date,
      custom_elements: [
        {
          'content:encoded': {
            // RSS readers need absolute URLs; responsive variants are for the website.
            _cdata: post.html
              .replace(/ srcset="[^"]*"/g, '')
              .replace(/(src|href)="\/(?!\/)/g, `$1="${site.url}/`),
          },
        },
      ],
    });
  }
  await fs.writeFile(`public/feeds/${name}.xml`, feed.xml({ indent: true }));
}
console.log(
  `Prepared ${posts.length} posts, assets, RSS feeds, and Apache rules.`,
);
