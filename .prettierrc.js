module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSameLine: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.md',
      options: {
        singleQuote: false,
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
};
