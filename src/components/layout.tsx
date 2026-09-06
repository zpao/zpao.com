import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div id="container" {...stylex.props(styles.container)}>
      <header id="bananaphone" {...stylex.props(styles.header)}>
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
      <section id="content">{children}</section>
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
  );
}

const styles = stylex.create({
  container: {
    width: { default: 700, '@media (max-width: 800px)': '92%' },
    marginInline: 'auto',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#75715e',
    marginBlock: 24,
    paddingBottom: 24,
    textAlign: 'center',
  },
  heading: { fontSize: '133%' },
  logo: {
    backgroundColor: '#f92672',
    color: '#272822',
    fontSize: '250%',
    padding: '0 15px',
    textDecoration: 'none',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    listStyleType: 'none',
  },
  navLink: { color: '#f8f8f0', textDecoration: 'none' },
  footer: { margin: '24px auto', textAlign: 'center' },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5em',
    fontSize: 24,
    listStyleType: 'none',
  },
  socialLink: {
    color: { default: '#75715e', ':hover': '#f8f8f0' },
    transition: 'color 0.2s',
    textDecoration: 'none',
  },
});
