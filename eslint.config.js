import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,

  ...astro.configs.recommended,

  {
    ignores: ['**/.astro/**', '**/dist/**', '**/node_modules/**', '**/*.copy.*', '**/*-copy.*'],
  },

  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx', '**/*.astro'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      indent: 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'space-before-function-paren': 'off',
      'keyword-spacing': 'off',
      'space-infix-ops': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'arrow-spacing': 'off',
      'block-spacing': 'off',
      'comma-spacing': 'off',
      'key-spacing': 'off',
      'no-multiple-empty-lines': 'off',
      'no-trailing-spaces': 'off',
    },
  },
];
