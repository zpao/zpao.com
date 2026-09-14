import type { Metadata } from 'next';
import { Link, PageHeader, Paragraph } from '@/components/content';
import { site } from '@/lib/site';
import { getPosts } from '@/lib/posts';

// The root layout's title template applies only to child route segments.
export const metadata: Metadata = {
  title: `${site.author} - ${site.subtitle}`,
};

export default async function IndexPage() {
  const [post] = await getPosts();

  return (
    <article>
      <PageHeader title="blah. blah. blah." />
      <Paragraph>
        My name is Paul O&rsquo;Shannessy & this is where I live on the
        internet.
      </Paragraph>

      <Paragraph>
        I’m a software engineer / engineering manager living in Seattle. My
        career is deeply intertwined with Open Source - I spent the last decade
        supporting Meta’s open source program and had previously been a
        maintainer of React & Firefox.
      </Paragraph>

      <Paragraph>
        At this point, I primarily use this site for writing. The last thing I
        wrote was titled{' '}
        <em>
          <Link href={post.slug}>{post.title}</Link>
        </em>
        .
      </Paragraph>
    </article>
  );
}
