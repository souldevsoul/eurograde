import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import productQuality from './eslint-plugin-product-quality/index.js';

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/public/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/dist/**',
      '**/build/**',
      '**/.vercel/**',
      '**/prisma/generated/**',
    ],
  },

  // Base JavaScript config
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        HTMLElement: 'readonly',
        Node: 'readonly',
        NodeJS: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FileReader: 'readonly',
        IntersectionObserver: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLDivElement: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        MouseEvent: 'readonly',
        CustomEvent: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'product-quality': productQuality,
      '@next/next': nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,

      // React Hooks Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js Rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',

      // Accessibility Rules (jsx-a11y)
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/iframe-has-title': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',

      // MAJAZ Product Quality Rules - CRITICAL
      'product-quality/use-styleguide-colors-only': 'warn',
      'product-quality/consistent-company-info': 'warn',
      'product-quality/no-cross-project-mentions': 'warn', // Downgrade to warn temporarily
      'product-quality/no-broken-internal-links': 'warn',
      'product-quality/no-missing-alt-text': 'warn',
      'product-quality/require-aria-label-on-icon-buttons': 'warn',
      'product-quality/no-form-without-submit': 'warn',
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',
      'product-quality/require-try-catch-fetch': 'warn',
      'product-quality/require-image-optimization': 'warn',
      'product-quality/require-empty-state': 'warn',
      'product-quality/consistent-payment-providers': 'warn',

      // Code Quality
      'no-unused-vars': 'off', // Handled by TypeScript for .ts/.tsx files
      'no-console': ['warn', {
        allow: ['warn', 'error', 'info'],
      }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-duplicate-imports': 'warn',
      'no-useless-return': 'warn',
      'no-else-return': 'warn',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }],

      // Best Practices
      'curly': ['warn', 'multi-line'],
      'dot-notation': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-await': 'warn',
      'no-throw-literal': 'error',
      'require-await': 'warn',
    },
  },

  // TypeScript config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'writable',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        HTMLElement: 'readonly',
        Node: 'readonly',
        NodeJS: 'readonly',
        React: 'readonly',
        JSX: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FileReader: 'readonly',
        IntersectionObserver: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLDivElement: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        MouseEvent: 'readonly',
        CustomEvent: 'readonly',
        global: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'product-quality': productQuality,
      '@next/next': nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,

      // TypeScript Rules
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // React Hooks Rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js Rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-sync-scripts': 'error',

      // Accessibility Rules (jsx-a11y)
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/iframe-has-title': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/interactive-supports-focus': 'warn',
      'jsx-a11y/label-has-associated-control': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',

      // MAJAZ Product Quality Rules - CRITICAL
      'product-quality/use-styleguide-colors-only': 'warn',
      'product-quality/consistent-company-info': 'warn',
      'product-quality/no-cross-project-mentions': 'warn', // Downgrade to warn temporarily
      'product-quality/no-broken-internal-links': 'warn',
      'product-quality/no-missing-alt-text': 'warn',
      'product-quality/require-aria-label-on-icon-buttons': 'warn',
      'product-quality/no-form-without-submit': 'warn',
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',
      'product-quality/require-try-catch-fetch': 'warn',
      'product-quality/require-image-optimization': 'warn',
      'product-quality/require-empty-state': 'warn',
      'product-quality/consistent-payment-providers': 'warn',

      // Code Quality
      'no-console': ['warn', {
        allow: ['warn', 'error', 'info'],
      }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'warn',
      'no-duplicate-imports': 'warn',
      'no-useless-return': 'warn',
      'no-else-return': 'warn',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }],

      // Best Practices
      'curly': ['warn', 'multi-line'],
      'dot-notation': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-await': 'warn',
      'no-throw-literal': 'error',
      'require-await': 'warn',
    },
  },
];
