import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
    },
  },

  ...astro.configs.recommended,

  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx', '**/*.astro'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prefer-const': 'error',
    },
  },
];
