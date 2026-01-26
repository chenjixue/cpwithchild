export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script'
    }
  }
]
