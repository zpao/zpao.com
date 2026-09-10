import React from 'react';
import * as stylex from '@stylexjs/stylex';
import parse, {
  attributesToProps,
  domToReact,
  type DOMNode,
  type HTMLReactParserOptions,
} from 'html-react-parser';

const styles = stylex.create({
  gist: { fontSize: '75%' },
  a: {
    color: { default: '#66d9ef', ':visited': '#ae81ff' },
    textDecoration: { default: 'none', ':hover': 'underline' },
  },
  p: { marginBottom: '1em' },
  ul: {
    marginBottom: '1em',
    listStylePosition: {
      default: 'outside',
      '@media (max-width: 600px)': 'inside',
    },
  },
  ol: {
    listStylePosition: {
      default: 'outside',
      '@media (max-width: 600px)': 'inside',
    },
  },
  header: { marginBottom: '1em' },
  h1: { fontSize: '133%' },
  h2: { fontSize: '111%' },
  time: { display: 'block', color: '#f8f8f0' },
  del: { color: '#75715e' },
  code: {
    backgroundColor: '#49483e',
    padding: '2px 4px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 1.5,
  },
  pre: {
    marginBottom: '1em',
    overflowX: 'auto',
    whiteSpace: 'pre',
    fontFamily: 'inherit',
  },
  blockquote: {
    padding: '0 48px',
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
  img: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    marginInline: 'auto',
  },
  iframe: { maxWidth: '100%' },
  highlight: { margin: '0.5em 0', padding: '1em', overflow: 'auto' },
  highlightedCode: {
    backgroundColor: 'transparent',
    padding: '2px 4px',
    color: 'inherit',
    textShadow: 'none',
    fontFamily: 'inherit',
  },
  codeLine: { display: 'block' },
  highlightedLine: {
    backgroundColor: '#49483e',
    display: 'block',
    margin: '0 -1em',
    padding: '0 1em',
  },
  date: {
    width: 128,
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
    paddingRight: 12,
  },
});
type StyleKey = keyof typeof styles;

// Okaidia token colors, previously supplied by Prism's global stylesheet.
const tokens = stylex.create({
  comment: { color: '#8292a2' },
  punctuation: { color: '#f8f8f2' },
  property: { color: '#f92672' },
  string: { color: '#a6e22e' },
  operator: { color: '#f8f8f2' },
  function: { color: '#e6db74' },
  keyword: { color: '#66d9ef' },
  number: { color: '#ae81ff' },
  regex: { color: '#fd971f' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
});
const tokenGroups = {
  prolog: 'comment',
  doctype: 'comment',
  cdata: 'comment',
  tag: 'property',
  constant: 'property',
  symbol: 'property',
  deleted: 'property',
  selector: 'string',
  'attr-name': 'string',
  char: 'string',
  builtin: 'string',
  inserted: 'string',
  entity: 'operator',
  url: 'operator',
  variable: 'operator',
  atrule: 'function',
  'attr-value': 'function',
  'class-name': 'function',
  boolean: 'number',
  important: 'regex',
} as const;

function elementStyle(tag: string, className = '') {
  const tokenStyles = className.split(' ').includes('token')
    ? className.split(' ').map((name) => {
        const tokenName =
          name in tokenGroups
            ? tokenGroups[name as keyof typeof tokenGroups]
            : name;
        return tokens[tokenName as keyof typeof tokens];
      })
    : [];
  return stylex.props(
    styles[tag as StyleKey],
    className === 'gist' && styles.gist,
    ...tokenStyles,
    className.includes('code-line') && styles.codeLine,
    className.includes('highlight-line') && styles.highlightedLine,
    tag === 'pre' && className.includes('language-') && styles.highlight,
    tag === 'code' && className.includes('language-') && styles.highlightedCode,
    tag === 'td' && className === 'date' && styles.date,
  );
}

function styled<Tag extends keyof React.JSX.IntrinsicElements>(tag: Tag) {
  return function Element({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<Tag>) {
    const sx = elementStyle(tag, className);
    return React.createElement(
      tag,
      {
        ...props,
        className: [className, sx.className].filter(Boolean).join(' '),
      },
      children,
    );
  };
}
export const P = styled('p');
export const A = styled('a');
export const Ul = styled('ul');
export const H1 = styled('h1');
export const H2 = styled('h2');
export const Header = styled('header');
export const Time = styled('time');
export const Del = styled('del');
export const Td = styled('td');
export function TextLink(props: React.ComponentPropsWithoutRef<'a'>) {
  // Plain anchors preserve legacy slugs containing dots, including their trailing slash.
  return <a {...stylex.props(styles.a)} {...props} />;
}

// Apply the same StyleX typography to trusted Markdown and its embedded HTML.
// Parsing to React also preserves embeds during client-side page navigation.
const options: HTMLReactParserOptions = {
  replace(node) {
    if (node.type !== 'tag') return;
    // GitHub includes inert UI templates whose DOM content React cannot hydrate.
    if (node.name === 'template') return <React.Fragment />;
    const props = attributesToProps(node.attribs);
    const className =
      typeof props.className === 'string' ? props.className : '';
    const sx = elementStyle(node.name, className);
    if (!sx.className) return;
    props.className = [props.className, sx.className].filter(Boolean).join(' ');
    return React.createElement(
      node.name,
      props,
      node.children?.length
        ? domToReact(node.children as DOMNode[], options)
        : undefined,
    );
  },
};
export function Markdown({ html }: { html: string }) {
  return parse(html, options);
}
