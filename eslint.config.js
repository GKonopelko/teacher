import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    ignores: ['**/.astro/**', '**/dist/**', '**/node_modules/**'],
  },

  // TypeScript файлы
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/prefer-as-const': 'warn',
      'prefer-const': 'warn',
    },
  },

  // JavaScript файлы
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
    },
  },

  // Скрипты внутри Astro файлов
  {
    files: ['**/*.astro/*.js', '**/*.astro/*.ts'],
    rules: {
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
