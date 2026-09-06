import { P, H1, Header, Del, TextLink } from '@/components/typography';
import React from 'react';

import { site } from '@/lib/site';
import { getPosts } from '@/lib/posts';

const IndexPage = async () => {
  const [post] = await getPosts();
  const pageTitle = 'blah. blah. blah.';

  return (
    <>
      <article>
        <Header>
          <H1>{pageTitle}</H1>
        </Header>
        <div className="post-content">
          <P>
            My name is Paul O&rsquo;Shannessy & this is where I live on the
            internet.
          </P>

          <P>
            I'm <Del>a software developer</Del> an engineering manager living in{' '}
            <Del>San Francisco</Del> Seattle. I write JavaScript & work on open
            source at <Del>Facebook</Del> Meta.{' '}
            <TextLink href="/about/">Read more about me & this site…</TextLink>
          </P>

          <P>
            At this point, I primarily use this site for writing. The last thing
            I wrote was titled{' '}
            <em>
              <TextLink href={post.slug}>{post.title}</TextLink>
            </em>
            .
          </P>
        </div>
      </article>
    </>
  );
};

export default IndexPage;

// The root layout's title template applies only to child route segments.
export const metadata = { title: `${site.author} - ${site.subtitle}` };
