import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const AboutPage = () => {
  const pageTitle = 'About + Contact';
  return (
    <Layout>
      <Helmet title={pageTitle} />
      <article>
        <header>
          <h1>{pageTitle}</h1>
        </header>
        <div className="post-content">
          <h2>About Paul</h2>

          <p>
            Bullet points are easier to write than a proper paragraph, so I’m
            going to be lazy.
          </p>

          <ul>
            <li>
              I’m married to a{' '}
              <a href="https://instagram.com/amandaoshannessy">
                pretty cool lady
              </a>
              .
            </li>
            <li>
              I currently work at{' '}
              <a href="https://www.facebook.com">Facebook</a>.
            </li>
            <li>
              I used to work on{' '}
              <a href="https://firefox.com">Firefox at Mozilla</a>.
            </li>
            <li>
              I write code & move furniture for{' '}
              <a href="http://onetruelovevintage.com">my wife’s company</a>.
            </li>
            <li>
              I have{' '}
              <a href="https://www.instagram.com/p/BFuZ_BRiRJC">
                a dog named Remy
              </a>{' '}
              &{' '}
              <a href="https://www.instagram.com/p/63PKmGCROd/">
                a cat named Ozlo
              </a>
              !
            </li>
            <li>
              I’m originally from the east coast of the US, growing up outside
              Philadelphia and then living in Pittsburgh for school. The west
              coast really is the best coast though. San Francisco was home for
              many years before moving to Seattle.
            </li>
            <li>
              I graduated from{' '}
              <a href="http://cmu.edu">Carnegie Mellon University</a> twice in
              2008. First with a BS in Information Systems and then later with a
              MS in Information Systems Management.
            </li>
            <li>
              I’m social on <a href="https://twitter.com/zpao">Twitter</a> &{' '}
              <a href="https://facebook.com/zpao">Facebook</a>.
            </li>
            <li>
              I put code on <a href="https://github.com/zpao">Github</a>.
            </li>
            <li>
              I listen to music on{' '}
              <del>
                <a title="RIP Rdio" href="http://www.rdio.com/people/zpao/">
                  Rdio
                </a>
              </del>{' '}
              <a href="https://open.spotify.com/user/zpao">Spotify</a> & track
              that with <a href="http://last.fm/user/zpao">last.fm</a>.
            </li>
            <li>
              When I remember, I put photos on{' '}
              <a href="https://flickr.com/photos/zpao">Flickr</a>.
            </li>
            <li>
              I have a{' '}
              <a href="https://www.linkedin.com/in/pauloshannessy">LinkedIn</a>{' '}
              account but really don’t like it.
            </li>
            <li>
              For a slightly more professional presentation that isn’t
              guaranteed to be up to date, I have{' '}
              <Link to="/resume/">my résumé</Link> as well.
            </li>
          </ul>

          <p>
            <strong>tl;dr</strong> I do stuff on the internet.
          </p>

          <h2>About zpao.com</h2>

          <p>
            This site has gone through many iterations. It was on the web with a
            couple “free to host” providers and free domains (`.tk` anyone?).
            Then in 2004 <a href="http://potch.me/">Matt Claypotch</a> & I
            decided to go dutch on hosting with{' '}
            <a
              href="http://www.dreamhost.com/r.cgi?98611"
              title="Yea, that’s a referral link for cash money">
              Dreamhost
            </a>{' '}
            and this (along with many other sites) have been there since. For a
            long time I had a Wordpress site here, then I was using Tumblr, then
            I wrote my own blogging software, then I was using Tumblr again,
            then I started using Jekyll. I’m sticking with that for the
            foreseeable future. There’s been a blog here for a long time. I’ve
            kept a lot of those posts around but let’s be honest, they weren’t
            all in the greatest taste.
          </p>

          <p>
            The current design was probably inspired by{' '}
            <a href="http://www.iawriter.com/mac/">iA Writer</a>. I’ve been
            using it a lot over the past few years to do most of my writing and
            I really enjoy the simplicity of it. As much as I would like, I
            can’t use their custom typeface here, so I’m using{' '}
            <a href="http://www.google.com/fonts/specimen/Inconsolata">
              Inconsolata
            </a>{' '}
            for everything.
          </p>

          <h2>Contact</h2>

          <p>
            If you want the quickest & shortest response,{' '}
            <a href="https://twitter.com/zpao">Twitter</a> is probably the best
            way. Otherwise, I do my best to respond to{' '}
            <a href="mailto:paul@oshannessy.com">email</a> as quickly as
            possible.
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default AboutPage;
