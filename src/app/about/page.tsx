import * as stylex from '@stylexjs/stylex';
import type { Metadata } from 'next';
import {
  ContentSection,
  Link,
  List,
  ListItem,
  PageHeader,
  Paragraph,
} from '@/components/content';
import { colors } from '../../styles/tokens.stylex';

export const metadata: Metadata = { title: 'About + Contact' };

export default function AboutPage() {
  const pageTitle = 'About + Contact';
  return (
    <article>
      <PageHeader title={pageTitle} />
      <ContentSection title="About Paul">
        <Paragraph>
          Bullet points are easier to write than a proper paragraph, so I’m
          going to be lazy.
        </Paragraph>

        <List>
          <ListItem>
            I’m married to a{' '}
            <Link href="https://instagram.com/amandaoshannessy">
              pretty cool lady
            </Link>
            .
          </ListItem>
          <ListItem>
            I currently work at{' '}
            <del {...stylex.props(styles.deleted)}>
              <Link href="https://www.facebook.com">Facebook</Link>
            </del>{' '}
            <Link href="https://meta.com">Meta</Link>.
          </ListItem>
          <ListItem>
            I used to work on{' '}
            <Link href="https://firefox.com">Firefox at Mozilla</Link>.
          </ListItem>
          <ListItem>
            I write code & move furniture for{' '}
            <Link href="http://onetruelovevintage.com">my wife’s company</Link>.
          </ListItem>
          <ListItem>
            I have{' '}
            <Link href="https://www.instagram.com/p/BFuZ_BRiRJC">
              a dog named Remy
            </Link>{' '}
            &{' '}
            <Link href="https://www.instagram.com/p/63PKmGCROd/">
              a cat named Ozlo
            </Link>
            !
          </ListItem>
          <ListItem>
            I’m originally from the east coast of the US, growing up outside
            Philadelphia and then living in Pittsburgh for school. The west
            coast really is the best coast though. San Francisco was home for
            many years before moving to Seattle.
          </ListItem>
          <ListItem>
            I graduated from{' '}
            <Link href="http://cmu.edu">Carnegie Mellon University</Link> twice
            in 2008. First with a BS in Information Systems and then later with
            a MS in Information Systems Management.
          </ListItem>
          <ListItem>
            I’m social on <Link href="https://twitter.com/zpao">Twitter</Link> &{' '}
            <Link href="https://facebook.com/zpao">Facebook</Link>.
          </ListItem>
          <ListItem>
            I put code on <Link href="https://github.com/zpao">GitHub</Link>.
          </ListItem>
          <ListItem>
            I listen to music on{' '}
            <del {...stylex.props(styles.deleted)}>
              <Link title="RIP Rdio" href="http://www.rdio.com/people/zpao/">
                Rdio
              </Link>
            </del>{' '}
            <Link href="https://open.spotify.com/user/zpao">Spotify</Link> &
            track that with <Link href="http://last.fm/user/zpao">last.fm</Link>
            .
          </ListItem>
          <ListItem>
            When I remember, I put photos on{' '}
            <Link href="https://flickr.com/photos/zpao">Flickr</Link>.
          </ListItem>
          <ListItem>
            I have a{' '}
            <Link href="https://www.linkedin.com/in/pauloshannessy">
              LinkedIn
            </Link>{' '}
            account but really don’t like it.
          </ListItem>
        </List>

        <Paragraph>
          <strong>tl;dr</strong> I do stuff on the internet.
        </Paragraph>
      </ContentSection>

      <ContentSection title="About zpao.com">
        <Paragraph>
          This site has gone through many iterations. It was on the web with a
          couple “free to host” providers and free domains (`.tk` anyone?). Then
          in 2004 <Link href="http://potch.me/">Matt Claypotch</Link> & I
          decided to go dutch on hosting with{' '}
          <Link
            href="http://www.dreamhost.com/r.cgi?98611"
            title="Yea, that’s a referral link for cash money">
            Dreamhost
          </Link>{' '}
          and this (along with many other sites) have been there since. For a
          long time I had a Wordpress site here, then I was using Tumblr, then I
          wrote my own blogging software, then I was using Tumblr again, then I
          started using Jekyll. I’m sticking with that for the foreseeable
          future. There’s been a blog here for a long time. I’ve kept a lot of
          those posts around but let’s be honest, they weren’t all in the
          greatest taste.
        </Paragraph>

        <Paragraph>
          The current design was probably inspired by{' '}
          <Link href="http://www.iawriter.com/mac/">iA Writer</Link>. I’ve been
          using it a lot over the past few years to do most of my writing and I
          really enjoy the simplicity of it. As much as I would like, I can’t
          use their custom typeface here, so I’m using{' '}
          <Link href="http://www.google.com/fonts/specimen/Inconsolata">
            Inconsolata
          </Link>{' '}
          for everything.
        </Paragraph>
      </ContentSection>

      <ContentSection title="Contact">
        <Paragraph>
          If you want the quickest & shortest response,{' '}
          <Link href="https://twitter.com/zpao">Twitter</Link> is probably the
          best way. Otherwise, I do my best to respond to{' '}
          <Link href="mailto:paul@oshannessy.com">email</Link> as quickly as
          possible.
        </Paragraph>
      </ContentSection>
    </article>
  );
}

const styles = stylex.create({
  deleted: { color: colors.textMuted },
});
