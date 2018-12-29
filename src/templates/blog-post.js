import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

class BlogPost extends React.Component {
  // componentDidMount() {
  //   if (typeof window.twttr.widgets !== 'undefined') {
  //     window.twttr.widgets.load();
  //   }
  // }

  render() {
    const post = this.props.data.markdownRemark;
    // const siteURL = this.props.data.site.siteMetadata.siteURL;
    // const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    // const siteDescription = post.excerpt;
    // const { previous, next } = this.props.pageContext;
    const { blurb, date, title, type } = post.frontmatter;
    // const { slug } = post.fields;

    let originalLink = null;
    if (type != null && type === 'link') {
      originalLink = (
        <p>
          <a href={post.frontmatter.sourceURL}>view original &rarr;</a>
        </p>
      );
    }

    const blurbNode = blurb != null ? <h2>{blurb}</h2> : null;

    // const permalink = siteURL + slug;

    return (
      <Layout pageTitle={title}>
        <Helmet
          title={title}
          meta={[
            { name: 'og:title', content: title },
            { name: 'og:description', content: '' },
            { name: 'og:title', content: 'article' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: 'title' },
            { name: 'twitter:description', content: '' },
            { name: 'twitter:site', content: '@zpao' },
            { name: 'twitter:creator', content: '@zpao' },
          ]}
        />
        <article>
          <header>
            <h1>{title}</h1>
            <time dateTime={date}>{date}</time>
            {blurbNode}
          </header>
          <div className="post-content">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            {originalLink}
          </div>

          {/* <div className="post-footer">
            <a
              href="https://twitter.com/share"
              className="twitter-share-button"
              data-url={permalink}
              data-text={title}
              data-via="zpao">
              Tweet
            </a>
            <div
              className="fb-like"
              data-href={permalink}
              data-layout="button_count"
              data-action="like"
              data-colorscheme="dark"
              size="small"
            />
            <iframe
              src={`//www.facebook.com/plugins/like.php?href=${permalink}&amp;send=false&amp;layout=button_count&amp;width=91&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21`}
              scrolling="no"
              frameBorder="0"
              style={{
                border: 'none',
                overflow: 'hidden',
                width: '91px',
                height: '21px',
              }}
              allowtransparency="true"
              title="Twitter Button"
            />
          </div> */}
        </article>
      </Layout>
    );
  }
}

export default BlogPost;
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteURL
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        blurb
        date(formatString: "YYYY-MM-DD")
        sourceURL: source_url
        title
        type
      }
    }
  }
`;
