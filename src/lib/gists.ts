import fs from 'node:fs/promises';
import path from 'node:path';
import type { Post } from './posts.ts';

export type GistFile = {
  filename: string;
  language: string | null;
  content: string;
  rawUrl: string;
};

export type Gist = {
  url: string;
  files: GistFile[];
};

function gistLocation(identifier: string) {
  const match = /^([\w-]+\/\w+)(?:#([\w.-]+))?$/.exec(identifier);
  if (!match) throw new Error(`Unsupported gist reference: ${identifier}`);
  const [owner, id] = match[1].split('/');
  return {
    url: `https://api.github.com/gists/${id}`,
    cache: path.join(
      '.cache/gists',
      encodeURIComponent(`${owner}/${id}`) + '.json',
    ),
    filename: match[2],
  };
}

async function fetchGist(identifier: string): Promise<Gist> {
  const { url } = gistLocation(identifier);
  const response = await fetch(url, {
    headers: {
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
    },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok)
    throw new Error(`Unable to fetch ${url}: ${response.status}`);
  const data = (await response.json()) as {
    html_url?: unknown;
    files?: Record<
      string,
      {
        filename?: unknown;
        language?: unknown;
        content?: unknown;
        raw_url?: unknown;
        truncated?: unknown;
      }
    >;
  };
  if (typeof data.html_url !== 'string' || !data.files)
    throw new Error(`Invalid Gist response: ${url}`);
  const files = await Promise.all(
    Object.values(data.files).map(async (file): Promise<GistFile> => {
      if (
        typeof file.filename !== 'string' ||
        typeof file.raw_url !== 'string' ||
        typeof file.content !== 'string'
      )
        throw new Error(`Invalid Gist file response: ${url}`);
      let content = file.content;
      if (file.truncated) {
        const raw = await fetch(file.raw_url, {
          signal: AbortSignal.timeout(30000),
        });
        if (!raw.ok)
          throw new Error(`Unable to fetch ${file.raw_url}: ${raw.status}`);
        content = await raw.text();
      }
      return {
        filename: file.filename,
        language: typeof file.language === 'string' ? file.language : null,
        content,
        rawUrl: file.raw_url,
      };
    }),
  );
  return { url: data.html_url, files };
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
    [
      ...new Map(
        identifiers.map((id) => [gistLocation(id).cache, id]),
      ).values(),
    ].map(async (identifier) => {
      const { cache } = gistLocation(identifier);
      try {
        await fs.access(cache);
        return;
      } catch (error) {
        if (!(
          error instanceof Error &&
          'code' in error &&
          error.code === 'ENOENT'
        ))
          throw error;
      }
      await fs.writeFile(cache, JSON.stringify(await fetchGist(identifier)));
    }),
  );
}

export async function readGist(identifier: string): Promise<Gist> {
  const { cache, filename } = gistLocation(identifier);
  const gist = JSON.parse(await fs.readFile(cache, 'utf8')) as Gist;
  if (!filename) return gist;
  const file = gist.files.find((file) => file.filename === filename);
  if (!file) throw new Error(`Gist file not found: ${identifier}`);
  return { ...gist, files: [file] };
}
