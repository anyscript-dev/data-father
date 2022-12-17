module.exports = {
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.json5'],
      options: {
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
    {
      files: ['*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
}
