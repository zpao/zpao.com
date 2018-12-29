import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';

// import Header from './header';
// import './layout.css';
import 'prismjs/themes/prism-okaidia.css';
import '../css/zpao.scss';
// import '../css/highlight.css';

const Layout = ({ children, data, pageTitle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `}
    render={data => {
      let author = data.site.siteMetadata.author;
      return (
        <div id="container">
          <Helmet titleTemplate={`${author} - %s`}>
            <meta name="description" content="Sample" />
            <link
              href="https://static.zpao.com/favicon.png"
              rel="shortcut icon"
              type="image/png"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Inconsolata:400,700"
              rel="stylesheet"
            />
            <link
              href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
              rel="stylesheet"
            />

            <link
              href="http://feeds.feedburner.com/zpao"
              rel="alternate"
              type="application/rss+xml"
            />
          </Helmet>
          <header id="bananaphone">
            <h1>
              <Link to="/">{data.site.siteMetadata.title}</Link>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link to="/about/">About + Contact</Link>
                </li>
                <li>
                  <Link to="/posts/">Archive</Link>
                </li>
              </ul>
            </nav>
          </header>
          <section id="content">{children}</section>

          <footer>
            <ul className="social-links">
              <li>
                <a href="https://www.facebook.com/zpao">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/zpao">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://github.com/zpao">
                  <i className="fa fa-github" />
                </a>
              </li>
            </ul>
          </footer>
        </div>
      );
    }}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
