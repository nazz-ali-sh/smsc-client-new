module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'prettier'],

  // Performance optimizations
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    // Only parse for type info when needed
    project: process.env.NODE_ENV === 'production' ? './tsconfig.json' : undefined,
    createDefaultProgram: false
  },

  rules: {
    'jsx-a11y/alt-text': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Simplified rules for better performance
    'lines-around-comment': [
      'warn', // Changed from 'error' to 'warn' for faster linting
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true
      }
    ],
    'padding-line-between-statements': [
      'warn', // Changed from 'error' to 'warn'
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['function', 'multiline-const', 'multiline-block-like']
      },
      {
        blankLine: 'always',
        prev: ['function', 'multiline-const', 'multiline-block-like'],
        next: '*'
      }
    ],
    'newline-before-return': 'warn', // Changed from 'error' to 'warn'
    'import/newline-after-import': [
      'warn', // Changed from 'error' to 'warn'
      {
        count: 1
      }
    ],
    'import/order': [
      'warn', // Changed from 'error' to 'warn' for faster processing
      {
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], ['object', 'unknown']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '~/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['react', 'type'],
        'newlines-between': 'always-and-inside-groups'
      }
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          Function: 'Use a specific function type instead',
          Object: 'Use object instead',
          Boolean: 'Use boolean instead',
          Number: 'Use number instead',
          String: 'Use string instead',
          Symbol: 'Use symbol instead',
          any: false,
          '{}': false
        }
      }
    ]
  },

  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {},
      typescript: {
        project: './tsconfig.json',
        // Cache for better performance
        cache: true
      }
    }
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx', 'src/iconify-bundle/*'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],


}
