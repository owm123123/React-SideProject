# React-Academind

# package.json

"@eslint/js": "^9.17.0",
"eslint-plugin-react": "^7.37.2",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.3",

# command line

npx eslint init

# eslint.config.js

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} \*/
export default [
{
files: ['**/\*.{js,mjs,cjs,jsx}'],
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
'react/prop-types': 'off',
},
},
];
