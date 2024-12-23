import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'no-constant-binary-expression': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
