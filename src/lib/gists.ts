import fs from 'node:fs/promises';
import path from 'node:path';
import type { Post } from './posts.ts';

function gistLocation(identifier: string) {
  const match = /^([\w-]+\/\w+)(?:#([\w.-]+))?$/.exec(identifier);
  if (!match) throw new Error(`Unsupported gist reference: ${identifier}`);
  return {
    url: `https://gist.github.com/${match[1]}.json${match[2] ? `?file=${encodeURIComponent(match[2])}` : ''}`,
    cache: path.join('.cache/gists', encodeURIComponent(identifier) + '.html'),
  };
}

export async function prepareGists(posts: Post[]) {
  await fs.mkdir('.cache/gists', { recursive: true });
  const identifiers = [
    ...new Set(
      posts.flatMap((post) =>
        [...post.content.matchAll(/`gist:([^`]+)`/g)].map((match) => match[1]),
      ),
    ),
  ];
  await Promise.all(
    identifiers.map(async (identifier) => {
      const { url, cache } = gistLocation(identifier);
      try {
        await fs.access(cache);
        return;
      } catch (error) {
        if (
          !(
            error instanceof Error &&
            'code' in error &&
            error.code === 'ENOENT'
          )
        )
          throw error;
      }
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok)
        throw new Error(`Unable to fetch ${url}: ${response.status}`);
      const { div } = (await response.json()) as { div?: unknown };
      if (typeof div !== 'string' || !div.includes('class="gist"'))
        throw new Error(`Invalid gist response: ${url}`);
      await fs.writeFile(cache, div.trim());
    }),
  );
}

export async function readGist(identifier: string) {
  return fs.readFile(gistLocation(identifier).cache, 'utf8');
}
