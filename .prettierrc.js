module.exports = {
  parser: 'babylon',
  printWidth: 120,
  semi: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  overrides: [
    {
      files: ['*.json', '.eslintrc', '.tslintrc', '.prettierrc', '.tern-project'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    }
  ]
};
