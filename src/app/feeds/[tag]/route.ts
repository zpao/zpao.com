import { createFeed } from '../../../lib/feed.ts';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return ['default', 'mozilla'].map((tag) => ({ tag: `${tag}.xml` }));
  // TODO: This will generate all possible feeds, which is overkill.
  // return (await getFeedTags()).map((tag) => ({ tag: `${tag}.xml` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ tag: string }> },
) {
  const { tag: filename } = await params;
  const tag = filename.replace(/\.xml$/, '');
  return new Response(await createFeed(tag), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
