import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import importPlugin from 'eslint-plugin-import'
import jestDomPlugin from 'eslint-plugin-jest-dom'
import playwrightPlugin from 'eslint-plugin-playwright'
import securityPlugin from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import testingLibraryPlugin from 'eslint-plugin-testing-library'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      import: importPlugin,
      security: securityPlugin,
      sonarjs,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'sonarjs/cognitive-complexity': ['warn', 18],
      'sonarjs/no-identical-functions': 'warn',
      'security/detect-object-injection': 'off',
      'security/detect-unsafe-regex': 'warn',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    plugins: {
      'testing-library': testingLibraryPlugin,
      'jest-dom': jestDomPlugin,
    },
    rules: {
      ...testingLibraryPlugin.configs.react.rules,
      ...jestDomPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['e2e/**/*.ts', 'playwright.config.ts'],
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules,
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'storybook-static/**',
  ]),
])

export default eslintConfig
