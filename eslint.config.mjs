import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      'allure-results/',
      'allure-report/',
      'test-results/',
    ],
  },
);
