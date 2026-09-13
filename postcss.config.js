module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['src/**/*.{js,mjs,ts,tsx}'],
      babelConfig: {
        babelrc: false,
        parserOpts: { plugins: ['jsx', 'typescript'] },
        plugins: require('./babel.config').plugins,
      },
      useCSSLayers: true,
    },
  },
};
