import fs from 'node:fs';
import path from 'node:path';

const SRC_POSTS_PATH = path.join(import.meta.dirname, '..', '_posts');
const DEST_POSTS_PATH = path.join(
  import.meta.dirname,
  '..',
  'src',
  'content',
  'posts',
);

const files = fs.readdirSync(SRC_POSTS_PATH);

console.log(files);

files.forEach((filename) => {
  if (!filename.endsWith('.markdown')) {
    return;
  }
  const match = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.markdown$/);
  if (!match) return;
  const slug = match[1];
  const destPath = path.join(DEST_POSTS_PATH, slug);
  const destFile = path.join(destPath, 'index.md');
  const srcFile = path.join(SRC_POSTS_PATH, filename);

  fs.mkdirSync(destPath, { recursive: true });
  fs.renameSync(srcFile, destFile);
});
