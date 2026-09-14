import { plugins as babelPlugins } from './babel.config';

// Next + Turbopack breaks with when not using an anonymous default export
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['src/**/*.{js,mjs,ts,tsx}'],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ['jsx', 'typescript'] },
        plugins: babelPlugins,
      },
      useCSSLayers: true,
    },
  },
};
