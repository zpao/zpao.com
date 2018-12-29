import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const PostsIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(edge => {
    const post = edge.node;
    return (
      <tr>
        <td className="date">
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
        </td>
        <td>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </td>
      </tr>
    );
  });

  const pageTitle = 'Archive';
  return (
    <Layout>
      <Helmet title={pageTitle} />
      <article>
        <header>
          <h1>{pageTitle}</h1>
        </header>
        <div className="post-content">
          <table id="post-list">{posts}</table>
        </div>
      </article>
    </Layout>
  );
};

export default PostsIndex;
export const pageQuery = graphql`
  query PostsIndex {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`;
