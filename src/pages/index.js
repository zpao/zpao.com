import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const IndexPage = ({ data }) => {
  const post = data.allMarkdownRemark.edges[0].node;
  const pageTitle = 'blah. blah. blah.';

  return (
    <Layout>
      <Helmet title={pageTitle} />
      <article>
        <header>
          <h1>{pageTitle}</h1>
        </header>
        <div className="post-content">
          <p>
            My name is Paul O&rsquo;Shannessy & this is where I live on the
            internet.
          </p>

          <p>
            I'm <del>a software developer</del> an engineering manager living in{' '}
            <del>San Francisco</del> Seattle. I write JavaScript & work on open
            source at <del>Facebook</del> Meta.{' '}
            <Link to="/about/">Read more about me & this site…</Link>
          </p>

          <p>
            At this point, I primarily use this site for writing. The last thing
            I wrote was titled{' '}
            <em>
              <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
            </em>
            .
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query IndexPage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
