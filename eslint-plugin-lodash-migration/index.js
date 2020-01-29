const rules = require('./lib/rules/rules.json');

// Can be removed when webapp/ is flattened
// eslint-disable-next-line no-undef
module.exports.rules = require('./lib/rules/all');

const all = Object.keys(rules);

const WARN = 1;

const configure = (list, level) => (
  list.reduce((ret, rule) => ({
    ...ret,
    [`lodash-migration/${rules[rule].ruleName || rule}`]: level,
  }), {})
);

// Can be removed when webapp/ is flattened
// eslint-disable-next-line no-undef
module.exports.configs = {
  all: {
    plugins: [
      'lodash-migration',
    ],
    rules: configure(all, WARN),
  },
};
