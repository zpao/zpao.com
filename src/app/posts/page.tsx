import { H1, Header, Time, Td, TextLink } from '@/components/typography';
import React from 'react';

import { getPosts } from '@/lib/posts';

const PostsIndex = async () => {
  const allPosts = await getPosts();
  const posts = allPosts.map((post) => {
    return (
      <tr key={post.slug}>
        <Td className="date">
          <Time dateTime={post.displayDate}>{post.displayDate}</Time>
        </Td>
        <Td>
          <TextLink href={post.slug}>{post.title}</TextLink>
        </Td>
      </tr>
    );
  });

  const pageTitle = 'Archive';
  return (
    <>
      <article>
        <Header>
          <H1>{pageTitle}</H1>
        </Header>
        <div className="post-content">
          <table id="post-list">
            <tbody>{posts}</tbody>
          </table>
        </div>
      </article>
    </>
  );
};

export default PostsIndex;

export const metadata = { title: 'Archive' };
