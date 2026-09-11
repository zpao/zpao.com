import '../css/global.css';
import * as stylex from '@stylexjs/stylex';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import { colors, layout, spacing, typography } from '../styles/tokens.stylex';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.author, template: `${site.author} - %s` },
  description: 'Paul O’Shannessy’s blog',
  icons: {
    shortcut: { url: 'https://static.zpao.com/favicon.png', type: 'image/png' },
  },
  alternates: {
    types: { 'application/rss+xml': 'http://feeds.feedburner.com/zpao' },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...stylex.props(styles.document)}>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Inconsolata:400,700"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <div {...stylex.props(styles.container)}>
          <header {...stylex.props(styles.header)}>
            <h1 {...stylex.props(styles.heading)}>
              <Link href="/" {...stylex.props(styles.logo)}>
                ZPAO
              </Link>
            </h1>
            <nav>
              <ul {...stylex.props(styles.navigation)}>
                <li>
                  <Link href="/about/" {...stylex.props(styles.navLink)}>
                    About + Contact
                  </Link>
                </li>
                <li>
                  <Link href="/posts/" {...stylex.props(styles.navLink)}>
                    Archive
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <section>{children}</section>
          <footer {...stylex.props(styles.footer)}>
            <ul {...stylex.props(styles.socialLinks)}>
              {['facebook', 'twitter', 'github'].map((name) => (
                <li key={name}>
                  <a
                    href={`https://${name}.com/zpao`}
                    aria-label={name}
                    {...stylex.props(styles.socialLink)}>
                    <i className={`fa fa-${name}`} />
                  </a>
                </li>
              ))}
            </ul>
          </footer>
          <Script id="analytics">{`if (navigator.doNotTrack !== '1' && window.doNotTrack !== '1' && navigator.msDoNotTrack !== '1') {
      window.dataLayer = window.dataLayer || []; window.gtag = function(){dataLayer.push(arguments);};
      gtag('js', new Date()); gtag('config', 'UA-66375-1', {anonymize_ip: true});
      var script = document.createElement('script'); script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-66375-1'; document.head.appendChild(script);
    }`}</Script>
        </div>
      </body>
    </html>
  );
}

const styles = stylex.create({
  document: {
    backgroundColor: colors.canvas,
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.bodySize,
    lineHeight: typography.lineHeight,
  },
  container: {
    width: layout.contentWidth,
    marginInline: 'auto',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.textMuted,
    marginBlock: spacing.large,
    paddingBottom: spacing.large,
    textAlign: 'center',
  },
  heading: { fontSize: typography.pageTitleSize },
  logo: {
    backgroundColor: colors.accent,
    color: colors.canvas,
    fontSize: typography.brandSize,
    padding: '0 15px',
    textDecoration: 'none',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing.large,
    listStyleType: 'none',
  },
  navLink: { color: colors.text, textDecoration: 'none' },
  footer: { marginBlock: spacing.large, textAlign: 'center' },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing.small,
    fontSize: typography.socialSize,
    listStyleType: 'none',
  },
  socialLink: {
    color: { default: colors.textMuted, ':hover': colors.text },
    transition: 'color 0.2s',
    textDecoration: 'none',
  },
});
