/**
 * ESLint Config – Frontend
 */
// Can be removed once webapp/ is flattened
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    jest: true,
    node: false,
  },
  reportUnusedDisableDirectives: true,
  settings: {
    'import/cache': Infinity,
    propWrapperFunctions: ["exact", "Object.freeze"],
  },
  plugins: [
    /** Required for the import resolver to work. */
    'import',
    /** You work here, right? */
    'react',
    /** Hooks are complicated and opinionated. */
    'react-hooks',
    /** Used to warn against dead CSS, which would be included despite not being used. */
    'css-modules',
    /** Required for ESLint to understand our syntax. */
    'babel',
    /** Lodash is safe but non-performant, part of v4 upgrade path. */
    'you-dont-need-lodash-underscore',
    /** Catch obvious A11Y problems in JSX templates. */
    'jsx-a11y',
  ],
  extends: [
    '4c-core',
    'plugin:react/recommended',
    'plugin:css-modules/recommended',
    'plugin:you-dont-need-lodash-underscore/all-warn',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    // -------------------------------------------------------------------------
    // General rules -----------------------------------------------------------
    // -------------------------------------------------------------------------

    /**
     * As nice as a hard 80 character limit sounds style-wise, it would be impossible
     * to do for certain Ember components because of the necessary indentation.
     */
    'max-len': ['warn', 160],

    /**
     * Bad for security. If you're logging errors throw them instead so Sentry
     * can see them, a la `throw new Error('My error message')`.
     */
    'no-console': 'warn',

    // -------------------------------------------------------------------------
    // Import rules ------------------------------------------------------------
    // -------------------------------------------------------------------------

    /** This rule is extremely slow and is covered by a Webpack plugin already. */
    'import/no-cycle': 'off',

    /** Should catch potential import problems before they get merged in. */
    'import/no-unresolved': ['error', {
      /** Injected by Babel, can't be resolved. */
      ignore: ['htmlbars-inline-precompile'],
    }],

    // -------------------------------------------------------------------------
    // React rules -------------------------------------------------------------
    // -------------------------------------------------------------------------

    /** Curly braces around children have a legitimate use case to enhance code readability */
    'react/jsx-curly-brace-presence': ['warn', {
      props: 'never',
      children: 'ignore',
    }],

    /** We use this to apply harsher restrictions on new code. */
    'react/jsx-filename-extension': 'error',

    /** Neither syntax is easier to read or understand. */
    'react/jsx-fragments': 'off',

    /**
     * Props should describe the shape or contents of collections.
     *
     * For objects you don't need to include an exhaustive list of all props, at
     * least include ones that are gaurunteed. Arrays should describe the type
     * contents, and their object shape if necessary.
     */
    'react/forbid-prop-types': ['warn', { forbid: ['any', 'array', 'object'] }],

    /** Better for visual scan. */
    'react/sort-prop-types': 'warn',

    /** Babel doesn't support `get` syntax. Should use functional components instead. */
    'react/static-property-placement': 'off',

    /**
     * The name should be enough to deter fools.
     * If you use `dangerouslySetInnerHtml` inappropriately @gmoe will find you.
     */
    'react/no-danger': 'off',

    'react/jsx-one-expression-per-line': ['warn', { allow: 'literal' }],
    'react/destructuring-assignment': 'off',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',

    /**
     * Great rule, but causes issues for passing props from hooks
     * and higher-order components. You should avoid spreading, as it makes
     * harder to understand code.
     */
    'react/jsx-props-no-spreading': 'off',

    /** https://reactjs.org/docs/hooks-rules.html */
    'react-hooks/rules-of-hooks': 'error',

    /**
     * This rule is contentious actually very effective at pointing out bad
     * implementation decisions. Sometimes they're very hard to fix without
     * large refactoring though, but future React work should address this.
     */
    'react-hooks/exhaustive-deps': 'warn',

    // -------------------------------------------------------------------------
    // CSS Module rules --------------------------------------------------------
    // -------------------------------------------------------------------------

    /**
     * Unused CSS selectors are imported into the bundle regardless if they're
     * used or not. This means longer load times and longer paint times.
     *
     * This rule works as intended when using the exports directly from the file,
     * but it fails when using `classnames/bind`. To confirm they're being used,
     * create a new binding object that consumes the exports.
     *
     * ```js
     * import styles from './myStyles.scss';
     *
     * const cx = ({
     *   'my-button': styles.myButton,
     *   disabled: styles.disabled,
     * });
     * ```
     */
    'css-modules/no-unused-class': ['error', { camelCase: true }],

    /**
     * Identify problems before they occur.
     */
    'css-modules/no-undef-class': ['error', { camelCase: true }],

    // -------------------------------------------------------------------------
    // JSX A11Y rules ----------------------------------------------------------
    // -------------------------------------------------------------------------

    /** Deprecated in ESLint 6.1.0, use `label-has-associated-control` */
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'error',

    // -------------------------------------------------------------------------
    // Lodash rules ------------------------------------------------------------
    // -------------------------------------------------------------------------

    /**
     * _.uniq is way faster than the suggested `[...new Set(items)]`.
     * Use either at your own discretion.
     */
    'you-dont-need-lodash-underscore/uniq': 'off',
    /**
     * _.flatten is super fast in Chrome and reasonable in Firefox. Native
     * `Array.prototype.flat()` is okay but _.flatten has the best
     * cross-browser performance.
     */
    'you-dont-need-lodash-underscore/flatten': 'off',
  },
  overrides: [
    {
      files: ['*.js'], // Emberland-specific overrides
      rules: {
        /** False positives outside of React component implementations. */
        'jsx-a11y/label-has-associated-control': 'off',
      },
    },
  ],
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
