const fs = require('fs');
const path = require('path');

const SRC_POSTS_PATH = path.join(__dirname, '..', '_posts');
const DEST_POSTS_PATH = path.join(__dirname, '..', 'src', 'pages', 'posts');

const files = fs.readdirSync(SRC_POSTS_PATH);

console.log(files);

files.forEach(filename => {
  if (!filename.endsWith('.markdown')) {
    return;
  }
  let slug = filename.match(/^\d{4}\-\d{2}\-\d{2}\-(.+).markdown$/)[1];
  let destPath = path.join(DEST_POSTS_PATH, slug);
  let destFile = path.join(destPath, 'index.md');
  let srcFile = path.join(SRC_POSTS_PATH, filename);

  fs.mkdirSync(destPath, { recursive: true });
  fs.renameSync(srcFile, destFile);
});
