import * as stylex from '@stylexjs/stylex';
import { colors } from '../styles/tokens.stylex';

const styles = stylex.create({
  comment: { color: colors.syntaxComment },
  punctuation: { color: colors.syntaxText },
  property: { color: colors.accent },
  string: { color: colors.syntaxString },
  operator: { color: colors.syntaxText },
  function: { color: colors.syntaxFunction },
  keyword: { color: colors.link },
  number: { color: colors.linkVisited },
  regex: { color: colors.syntaxRegex },
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

export function syntaxStyles(className: string) {
  if (!className.split(' ').includes('token')) return [];
  return className.split(' ').map((name) => {
    const tokenName =
      name in tokenGroups
        ? tokenGroups[name as keyof typeof tokenGroups]
        : name;
    return styles[tokenName as keyof typeof styles];
  });
}
