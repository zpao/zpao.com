import '../css/global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Layout from '@/components/layout';
import { site } from '@/lib/site';

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
    <html lang="en">
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
