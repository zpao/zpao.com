import React from 'react';
import * as stylex from '@stylexjs/stylex';
import parse, {
  attributesToProps,
  domToReact,
  type DOMNode,
  type Element,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import { Link, List, Paragraph } from '@/components/content';
import { syntaxStyles } from '@/components/syntax-highlighting';
import { colors, spacing, typography } from '../styles/tokens.stylex';

const styles = stylex.create({
  gist: { fontSize: typography.smallSize },
  heading1: { fontSize: typography.pageTitleSize },
  heading2: { fontSize: typography.sectionTitleSize },
  code: {
    backgroundColor: colors.surface,
    padding: '2px 4px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: typography.lineHeight,
  },
  pre: {
    marginBottom: spacing.medium,
    overflowX: 'auto',
    whiteSpace: 'pre',
    fontFamily: 'inherit',
  },
  blockquote: {
    paddingInline: spacing.quoteInset,
    fontStyle: 'italic',
    position: 'relative',
    listStylePosition: 'inside',
    '::before': {
      content: '"“"',
      fontSize: '400%',
      left: -12,
      lineHeight: 1,
      position: 'absolute',
    },
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    marginInline: 'auto',
  },
  iframe: { maxWidth: '100%' },
  highlight: {
    marginBlock: spacing.small,
    padding: spacing.medium,
    overflow: 'auto',
  },
  highlightedCode: {
    backgroundColor: 'transparent',
    padding: '2px 4px',
    color: 'inherit',
    textShadow: 'none',
    fontFamily: 'inherit',
  },
  codeLine: { display: 'block' },
  highlightedLine: {
    backgroundColor: colors.surface,
    display: 'block',
    marginInline: `calc(-1 * ${spacing.medium})`,
    paddingInline: spacing.medium,
  },
  deleted: { color: colors.textMuted },
});

function childrenFor(node: Element) {
  return node.children?.length
    ? domToReact(node.children as DOMNode[], options)
    : undefined;
}

function styledElement(
  node: Element,
  props: ReturnType<typeof attributesToProps>,
  ...nodeStyles: stylex.StyleXStyles[]
) {
  const sx = stylex.props(...nodeStyles);
  props.className = [props.className, sx.className].filter(Boolean).join(' ');
  return React.createElement(node.name, props, childrenFor(node));
}

const options: HTMLReactParserOptions = {
  replace(node) {
    if (node.type !== 'tag') return;
    if (node.name === 'template') return <React.Fragment />;

    const props = attributesToProps(node.attribs);
    const className =
      typeof props.className === 'string' ? props.className : '';
    const children = childrenFor(node);

    if (node.name === 'p') return <Paragraph {...props}>{children}</Paragraph>;
    if (node.name === 'a' && typeof props.href === 'string')
      return (
        <Link {...props} href={props.href}>
          {children}
        </Link>
      );
    if (node.name === 'ul') return <List {...props}>{children}</List>;
    if (node.name === 'ol')
      return (
        <List {...props} ordered>
          {children}
        </List>
      );
    if (node.name === 'del') return styledElement(node, props, styles.deleted);

    const commonStyles = [
      ...syntaxStyles(className),
      className === 'gist' && styles.gist,
      className.includes('code-line') && styles.codeLine,
      className.includes('highlight-line') && styles.highlightedLine,
    ];

    if (node.name === 'h1')
      return styledElement(node, props, styles.heading1, ...commonStyles);
    if (node.name === 'h2')
      return styledElement(node, props, styles.heading2, ...commonStyles);
    if (node.name === 'code')
      return styledElement(
        node,
        props,
        styles.code,
        className.includes('language-') && styles.highlightedCode,
        ...commonStyles,
      );
    if (node.name === 'pre')
      return styledElement(
        node,
        props,
        styles.pre,
        className.includes('language-') && styles.highlight,
        ...commonStyles,
      );
    if (node.name === 'blockquote')
      return styledElement(node, props, styles.blockquote, ...commonStyles);
    if (node.name === 'img')
      return styledElement(node, props, styles.image, ...commonStyles);
    if (node.name === 'iframe')
      return styledElement(node, props, styles.iframe, ...commonStyles);
    if (commonStyles.some(Boolean))
      return styledElement(node, props, ...commonStyles);
  },
};

export function Markdown({ html }: { html: string }) {
  return parse(html, options);
}
