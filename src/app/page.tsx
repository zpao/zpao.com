import * as stylex from '@stylexjs/stylex';
import type { Metadata } from 'next';
import { Link, PageHeader, Paragraph } from '@/components/content';
import { site } from '@/lib/site';
import { getPosts } from '@/lib/posts';
import { colors } from '../styles/tokens.stylex';

// The root layout's title template applies only to child route segments.
export const metadata: Metadata = {
  title: `${site.author} - ${site.subtitle}`,
};

export default async function IndexPage() {
  const [post] = await getPosts();
  const pageTitle = 'blah. blah. blah.';

  return (
    <article>
      <PageHeader title={pageTitle} />
      <Paragraph>
        My name is Paul O&rsquo;Shannessy & this is where I live on the
        internet.
      </Paragraph>

      <Paragraph>
        I'm <del {...stylex.props(styles.deleted)}>a software developer</del> an
        engineering manager living in{' '}
        <del {...stylex.props(styles.deleted)}>San Francisco</del> Seattle. I
        write JavaScript & work on open source at{' '}
        <del {...stylex.props(styles.deleted)}>Facebook</del> Meta.{' '}
        <Link href="/about/">Read more about me & this site…</Link>
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

const styles = stylex.create({
  deleted: { color: colors.textMuted },
});
