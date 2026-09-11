import * as stylex from '@stylexjs/stylex';
import NextLink from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { colors, spacing, typography } from '../styles/tokens.stylex';

function classNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

function isNextRoute(href: string) {
  if (href.startsWith('#')) return true;
  if (!href.startsWith('/')) return false;
  // Next treats legacy slugs ending in dotted names as files and strips `/`.
  return !/\/[^/]*\.[^/]+\/$/.test(href);
}

export function Link({
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<'a'> & { href: string }) {
  const sx = stylex.props(styles.link);
  const linkProps = {
    ...props,
    ...sx,
    className: classNames(className, sx.className),
  };

  return isNextRoute(href) ? (
    <NextLink href={href} {...linkProps} />
  ) : (
    <a href={href} {...linkProps} />
  );
}

export function PageHeader({
  title,
  date,
  description,
}: {
  title: ReactNode;
  date?: { dateTime: string; label: ReactNode };
  description?: ReactNode;
}) {
  return (
    <header {...stylex.props(styles.pageHeader)}>
      <h1 {...stylex.props(styles.pageTitle)}>{title}</h1>
      {date && (
        <time dateTime={date.dateTime} {...stylex.props(styles.date)}>
          {date.label}
        </time>
      )}
      {description && (
        <p {...stylex.props(styles.description)}>{description}</p>
      )}
    </header>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 {...stylex.props(styles.sectionTitle)}>{title}</h2>
      {children}
    </section>
  );
}

export function Paragraph({
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  const sx = stylex.props(styles.paragraph);
  return (
    <p {...props} {...sx} className={classNames(className, sx.className)} />
  );
}

export function List({
  ordered = false,
  className,
  ...props
}: ComponentPropsWithoutRef<'ul'> & { ordered?: boolean }) {
  const sx = stylex.props(styles.list);
  const listProps = {
    ...props,
    ...sx,
    className: classNames(className, sx.className),
  };
  return ordered ? <ol {...listProps} /> : <ul {...listProps} />;
}

export function ListItem(props: ComponentPropsWithoutRef<'li'>) {
  return <li {...props} />;
}

const styles = stylex.create({
  link: {
    color: { default: colors.link, ':visited': colors.linkVisited },
    textDecoration: { default: 'none', ':hover': 'underline' },
  },
  pageHeader: { marginBottom: spacing.medium },
  pageTitle: { fontSize: typography.pageTitleSize },
  sectionTitle: { fontSize: typography.sectionTitleSize },
  description: { fontSize: typography.sectionTitleSize },
  date: { display: 'block', color: colors.text },
  paragraph: { marginBottom: spacing.medium },
  list: {
    marginBottom: spacing.medium,
    listStylePosition: {
      default: 'outside',
      '@media (max-width: 600px)': 'inside',
    },
  },
});
