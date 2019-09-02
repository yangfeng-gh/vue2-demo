module.exports = {
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' }
    }
  ],
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  bracketSpacing: true,
  parser: 'babel'
}
