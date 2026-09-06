import {
  P,
  A,
  Ul,
  H1,
  H2,
  Header,
  Del,
  TextLink,
} from '@/components/typography';
import React from 'react';

const AboutPage = () => {
  const pageTitle = 'About + Contact';
  return (
    <>
      <article>
        <Header>
          <H1>{pageTitle}</H1>
        </Header>
        <div className="post-content">
          <H2>About Paul</H2>

          <P>
            Bullet points are easier to write than a proper paragraph, so I’m
            going to be lazy.
          </P>

          <Ul>
            <li>
              I’m married to a{' '}
              <A href="https://instagram.com/amandaoshannessy">
                pretty cool lady
              </A>
              .
            </li>
            <li>
              I currently work at{' '}
              <Del>
                <A href="https://www.facebook.com">Facebook</A>
              </Del>{' '}
              <A href="https://meta.com">Meta</A>.
            </li>
            <li>
              I used to work on{' '}
              <A href="https://firefox.com">Firefox at Mozilla</A>.
            </li>
            <li>
              I write code & move furniture for{' '}
              <A href="http://onetruelovevintage.com">my wife’s company</A>.
            </li>
            <li>
              I have{' '}
              <A href="https://www.instagram.com/p/BFuZ_BRiRJC">
                a dog named Remy
              </A>{' '}
              &{' '}
              <A href="https://www.instagram.com/p/63PKmGCROd/">
                a cat named Ozlo
              </A>
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
              <A href="http://cmu.edu">Carnegie Mellon University</A> twice in
              2008. First with a BS in Information Systems and then later with a
              MS in Information Systems Management.
            </li>
            <li>
              I’m social on <A href="https://twitter.com/zpao">Twitter</A> &{' '}
              <A href="https://facebook.com/zpao">Facebook</A>.
            </li>
            <li>
              I put code on <A href="https://github.com/zpao">GitHub</A>.
            </li>
            <li>
              I listen to music on{' '}
              <Del>
                <A title="RIP Rdio" href="http://www.rdio.com/people/zpao/">
                  Rdio
                </A>
              </Del>{' '}
              <A href="https://open.spotify.com/user/zpao">Spotify</A> & track
              that with <A href="http://last.fm/user/zpao">last.fm</A>.
            </li>
            <li>
              When I remember, I put photos on{' '}
              <A href="https://flickr.com/photos/zpao">Flickr</A>.
            </li>
            <li>
              I have a{' '}
              <A href="https://www.linkedin.com/in/pauloshannessy">LinkedIn</A>{' '}
              account but really don’t like it.
            </li>
            <li>
              For a slightly more professional presentation that isn’t
              guaranteed to be up to date, I have{' '}
              <TextLink href="/resume/">my résumé</TextLink> as well.
            </li>
          </Ul>

          <P>
            <strong>tl;dr</strong> I do stuff on the internet.
          </P>

          <H2>About zpao.com</H2>

          <P>
            This site has gone through many iterations. It was on the web with a
            couple “free to host” providers and free domains (`.tk` anyone?).
            Then in 2004 <A href="http://potch.me/">Matt Claypotch</A> & I
            decided to go dutch on hosting with{' '}
            <A
              href="http://www.dreamhost.com/r.cgi?98611"
              title="Yea, that’s a referral link for cash money">
              Dreamhost
            </A>{' '}
            and this (along with many other sites) have been there since. For a
            long time I had a Wordpress site here, then I was using Tumblr, then
            I wrote my own blogging software, then I was using Tumblr again,
            then I started using Jekyll. I’m sticking with that for the
            foreseeable future. There’s been a blog here for a long time. I’ve
            kept a lot of those posts around but let’s be honest, they weren’t
            all in the greatest taste.
          </P>

          <P>
            The current design was probably inspired by{' '}
            <A href="http://www.iawriter.com/mac/">iA Writer</A>. I’ve been
            using it a lot over the past few years to do most of my writing and
            I really enjoy the simplicity of it. As much as I would like, I
            can’t use their custom typeface here, so I’m using{' '}
            <A href="http://www.google.com/fonts/specimen/Inconsolata">
              Inconsolata
            </A>{' '}
            for everything.
          </P>

          <H2>Contact</H2>

          <P>
            If you want the quickest & shortest response,{' '}
            <A href="https://twitter.com/zpao">Twitter</A> is probably the best
            way. Otherwise, I do my best to respond to{' '}
            <A href="mailto:paul@oshannessy.com">email</A> as quickly as
            possible.
          </P>
        </div>
      </article>
    </>
  );
};

export default AboutPage;

export const metadata = { title: 'About + Contact' };
