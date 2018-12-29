/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const { graphql } = require('gatsby');
const path = require('path');
const fs = require('fs');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    resolve(
      graphql(
        `
          {
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
                    title
                    old_permalink
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges.filter(edge => {
          return edge.node.fields.slug.includes('/posts/');
        });

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });

          // Add redirects as necessary
          if (post.node.frontmatter.old_permalink != null) {
            createRedirect({
              fromPath: '/' + post.node.frontmatter.old_permalink,
              toPath: post.node.fields.slug,
              isPermanent: true,
            });
          }
        });
      })
    );
  });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `MarkdownRemark`) {
//     let filePath = createFilePath({ node, getNode });

//     const match = filePath.match(/^\/(.+)\/(\d{4}\-\d{2}\-\d{2})\-(.+)\/$/);
//     if (match !== null) {
//       const [, pathPrefix, , slug] = match;
//       filePath = `/${pathPrefix}/${slug}/`;
//     }

//     createNodeField({
//       name: `slug`,
//       node,
//       value: filePath,
//     });
//   }
// };

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.onPostBuild = async ({ store, pathPrefix }, userPluginOptions) => {
  const { program, redirects } = store.getState();

  const htaccessFile = path.join(program.directory, 'public', '.htaccess');
  const htaccessLines = [
    `RewriteEngine On`,
    `RewriteBase /`,
    `ErrorDocument 404 /404.html`,
    ...redirects.map(redirect => {
      return `RewriteRule ^${redirect.fromPath}$ ${
        redirect.toPath
      } [R=301,NC,L]`;
    }),
  ];

  const htaccessContents = htaccessLines.join('\n');

  fs.writeFileSync(htaccessFile, htaccessContents);
};
