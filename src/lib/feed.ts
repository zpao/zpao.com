import RSS from 'rss';
import { getPosts, renderPost, site } from './posts.ts';

export async function getFeedTags() {
  const posts = await getPosts();
  return [
    'default',
    ...new Set(
      posts.flatMap((post) =>
        (post.tags ?? []).map((tag) => tag.toLowerCase()),
      ),
    ),
  ];
}

export async function createFeed(tag: string) {
  tag = tag.toLowerCase();
  const posts = await Promise.all(
    (await getPosts()).map((post) => renderPost(post)),
  );
  const feed = new RSS({
    title: `${site.title} - ${site.subtitle}`,
    generator: '',
    feed_url: `${site.url}/feeds/${tag}.xml`,
    site_url: site.url,
  });

  for (const post of posts.filter(
    (post) =>
      tag === 'default' ||
      post.tags?.some((postTag) => postTag.toLowerCase() === tag),
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

  return feed.xml({ indent: true });
}
