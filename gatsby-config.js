function rssSetup({ query: { site, allMarkdownRemark } }) {
  return {
    title: `${site.siteMetadata.author} - ${site.siteMetadata.subTitle}`,
    generator: null,
    feed_url: `${site.siteMetadata.siteURL}/feeds/default.xml`,
    site_url: site.siteMetadata.siteURL,
  };
}

function rssSerialize({ query: { site, allMarkdownRemark } }) {
  return allMarkdownRemark.edges.map(edge => {
    return {
      title: edge.node.frontmatter.title,
      description: edge.node.excerpt,
      url: site.siteMetadata.siteURL + edge.node.fields.slug,
      guid: site.siteMetadata.siteURL + edge.node.fields.slug,
      custom_elements: [{ 'content:encoded': edge.node.html }],
      author: 'Paul O’Shannessy',
    };
  });
}

module.exports = {
  siteMetadata: {
    title: 'ZPAO',
    subTitle: 'blah. blah. blah.',
    author: 'Paul O’Shannessy',
    // siteURL: 'https://zpao.com',
    siteURL: 'http://moc.oapz.zpao.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          { resolve: 'gatsby-remark-embed-gist' },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              backgroundColor: 'rgba(0,0,0,0)',
            },
          },
          'gatsby-remark-prismjs',
          // 'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-66375-1',
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        // I shouldn't need this.
        // TODO: file a bug
        query: `
          {
            site {
              siteMetadata {
                author,
                title
                subTitle,
                siteURL
              }
            }
          }
        `,
        feeds: [
          {
            setup: rssSetup,
            serialize: rssSerialize,
            query: `
              {
                site {
                  siteMetadata {
                    author,
                    title
                    subTitle,
                    siteURL
                  }
                }
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/feeds/default.xml',
          },
          {
            setup: rssSetup,
            serialize: rssSerialize,
            query: `
              {
                site {
                  siteMetadata {
                    author,
                    title
                    subTitle,
                    siteURL
                  }
                }
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { tags: { in: ["mozilla"] } } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/feeds/mozilla.xml',
          },
        ],
      },
    },
    // 'htaccess',
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: 'gatsby-starter-default',
    //     short_name: 'starter',
    //     start_url: '/',
    //     background_color: '#663399',
    //     theme_color: '#663399',
    //     display: 'minimal-ui',
    //     icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
    //   },
    // },
    // 'gatsby-plugin-offline',
  ],
};
