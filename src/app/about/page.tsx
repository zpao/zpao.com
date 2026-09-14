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
            I spent 14 years working on React and other open source efforts at
            Meta. Before that, I worked on Firefox at Mozilla.
          </ListItem>
          <ListItem>I have a dog named Mabel & a cat named Ozlo.</ListItem>
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
            I’m social on <Link href="https://threads.com/@zpao">Threads</Link>{' '}
            & sometimes <Link href="https://twitter.com/zpao">Twitter</Link>.
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
            I’m a professional adult on{' '}
            <Link href="https://www.linkedin.com/in/pauloshannessy">
              LinkedIn
            </Link>
            .
          </ListItem>
          <ListItem>
            I occasionally post photos on{' '}
            <Link href="https://www.instagram.com/zpao/">Instagram</Link>.
          </ListItem>
        </List>

        <Paragraph>
          <strong>tl;dr</strong> I do stuff on the internet.
        </Paragraph>
      </ContentSection>

      <ContentSection title="Contact">
        <Paragraph>
          You can try reaching me where you can find me online. Otherwise, I do
          my best to respond to{' '}
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
