import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { prepareGists } from '../src/lib/gists.ts';
import { imageInfo, variantName } from '../src/lib/images.ts';
import {
  getPosts,
  renderPost,
  postsDirectory,
} from '../src/lib/posts.ts';
import { createHtaccess } from '../src/lib/htaccess.ts';

// Remove generated post assets so deleted or renamed files cannot linger.
await fs.rm('public/posts', { recursive: true, force: true });
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
console.log(`Prepared ${posts.length} posts, assets, and Apache rules.`);
