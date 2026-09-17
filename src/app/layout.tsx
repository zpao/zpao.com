import '../css/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import * as stylex from '@stylexjs/stylex';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { config, type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { site } from '@/lib/site';
import { colors, layout, spacing, typography } from '../styles/tokens.stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThreads,
  faXTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '700'],
  fallback: ['ui-monospace', 'monospace'],
  variable: '--font-inconsolata',
});

config.autoAddCss = false;

const SOCIALS: Array<{ name: string; url: string; icon: IconDefinition }> = [
  {
    name: 'threads',
    url: 'https://threads.com/@zpao',
    icon: faThreads,
  },
  {
    name: 'x',
    url: 'https://x.com/zpao',
    icon: faXTwitter,
  },
  {
    name: 'github',
    url: 'https://github.com/zpao',
    icon: faGithub,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.author, template: `${site.author} - %s` },
  description: 'Paul O’Shannessy’s blog',
  icons: {
    shortcut: { url: 'https://static.zpao.com/favicon.png', type: 'image/png' },
  },
  alternates: {
    types: { 'application/rss+xml': 'https://feeds.feedburner.com/zpao' },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inconsolata.variable}>
      <body {...stylex.props(styles.document)}>
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
              {SOCIALS.map(({ name, url, icon }) => (
                <li key={name}>
                  <a
                    href={url}
                    aria-label={name}
                    {...stylex.props(styles.socialLink)}>
                    <FontAwesomeIcon icon={icon} />
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
