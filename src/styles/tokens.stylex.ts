import * as stylex from '@stylexjs/stylex';

const SMALL_SCREEN = '@media (max-width: 600px)';
const NARROW_SCREEN = '@media (max-width: 800px)';

export const colors = stylex.defineVars({
  canvas: '#272822',
  text: '#f8f8f0',
  textMuted: '#75715e',
  surface: '#49483e',
  accent: '#f92672',
  link: '#66d9ef',
  linkVisited: '#ae81ff',
  syntaxText: '#f8f8f2',
  syntaxComment: '#8292a2',
  syntaxString: '#a6e22e',
  syntaxFunction: '#e6db74',
  syntaxRegex: '#fd971f',
});

export const spacing = stylex.defineVars({
  small: '0.5rem',
  medium: '1rem',
  large: '1.5rem',
  quoteInset: '3rem',
});

export const typography = stylex.defineVars({
  family: 'Inconsolata, monospace',
  bodySize: { default: '18px', [SMALL_SCREEN]: '14px' },
  lineHeight: '1.5',
  smallSize: '75%',
  pageTitleSize: '133%',
  sectionTitleSize: '111%',
  brandSize: '250%',
  socialSize: '24px',
});

export const layout = stylex.defineVars({
  contentWidth: { default: '700px', [NARROW_SCREEN]: '92%' },
  archiveDateWidth: '128px',
});
