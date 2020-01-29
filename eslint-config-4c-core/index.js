/**
 * ESLint Config – Core
 */
// This can be removed once webapp/ is flattened
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: false,
    node: true,
    jest: true,
  },
  reportUnusedDisableDirectives: true,
  settings: { 'import/cache': Infinity },
  plugins: [
    /** Required for the import resolver to work. */
    'import',
    /** Required for ESLint to understand our syntax. */
    'babel',
  ],
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    // -------------------------------------------------------------------------
    // General rules -----------------------------------------------------------
    // -------------------------------------------------------------------------

    /**
     * Require type-safe checking for all comparisons including null checks
     */
    eqeqeq: ['error', 'always'],

    /**
     * 80-character default is too aggressive.
     */
    'max-len': ['warn', 120],

    /**
     * Anonymous functions make it harder to determine where errors occur and
     * where performance bottlenecks are in the dev tools.
     */
    'func-names': 'warn',

    /** https://github.com/airbnb/javascript#arrows--one-arg-parens */
    'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],

    /**
     * Allowed in loop statements, but makes for unreadable code in most cases.
     * Also oddly in JS it's a cycle faster to use `+=` instead of `++`, go figure.
     */
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],

    /**
     * Non-arrow functions have weird scoping that trips up non-JS engineers, also it's
     * more characters to type with no benefits to visual scan.
     */
    'prefer-arrow-callback': 'warn',

    /** Reinforces classes being capitalized. */
    'new-cap': 'warn',

    /** All vars should be camelCase, however our endpoints use snake_case because PEP8. */
    camelcase: 'off',

    /** You should be using something that short-circuits like some(), find(), etc. */
    'no-constant-condition': ['warn', { checkLoops: true }],

    /**
     * This is a gross shortcut that can lead to bad code comprehension. But it's also good
     * practice to assign values into params inside reduce(), so for now it stays.
     */
    'no-param-reassign': 'off',

    /** In general this is gross, but I don't necessarily think this should be disallowed. */
    'no-continue': 'off',

    'object-curly-newline': ['warn', {
      multiline: true,
      minProperties: 4,
    }],

    /** The following recategorize rules from errors to warnings. */
    quotes: 'warn',
    'key-spacing': 'warn',
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'object-curly-spacing': 'warn',
    'space-in-parens': 'warn',
    'quote-props': 'warn',
    'one-var-declaration-per-line': 'warn',

    /** Safe for Apollo, but leaks information in the frontend. */
    'no-console': 'off',

    'space-before-function-paren': 'off',

    /** Produces way smaller diffs, also resulting in less merge conflicts. */
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],

    /** We use it to denote "private" members. */
    'no-underscore-dangle': 'off',

    /** Unused variables take up memory in local scope regardless of usage. */
    'no-unused-vars': ['error', { argsIgnorePattern: '^__' }],

    /** Handles semi-colons better than the stock ESLint rule. */
    'babel/semi': 'warn',

    /**
     * This pair of rules prevents no-unused-expressions errors when using optional
     * chaining to make method calls. The official ESLint rule does not allow e.g.
     * `deferred?.resolve();` and the babel plugin rule fixes that.
     */
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error',

    // -------------------------------------------------------------------------
    // Import rules ------------------------------------------------------------
    // -------------------------------------------------------------------------

    /**
     * Extremely bad practice. This is occasionally used to get the default
     * export in AMD contexts, so this should catch potential issues from
     * incomplete decaffeination and ES6 conversion.
     */
    'no-import-assign': 'error',

    /** Should catch potential import problems before they get merged in. */
    'import/no-unresolved': 'error',

    /**
     * Our code-splitting can get destroyed by bad imports. They'll be
     * included even if they're not used, Webpack is not that smart.
     */
    'import/no-extraneous-dependencies': 'error',

    /** ESLint can't find unused dependencies in AMD. */
    'import/no-amd': 'error',

    /** Give standardized names to chunks for better long-term caching. */
    'import/dynamic-import-chunkname': 'error',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
    babelOptions: {
      babelrc: false,
      rootMode: 'upward',
    },
  },
};
