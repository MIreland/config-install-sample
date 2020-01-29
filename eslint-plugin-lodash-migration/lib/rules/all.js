const rules = require('./rules');

function getAssignmentLeftHandSide(node) {
  // For VariableDeclarator nodes, the left hand side is called `id`
  // The `x` on `var x = 3;
  if (node.type === 'VariableDeclarator') {
    return node.id;
  }
  // For AssignmentExpression nodes, the left hand side is called `left`
  // The `x` on `x = 3;
  if (node.type === 'AssignmentExpression') {
    return node.left;
  }
  return null;
}

Object.entries(rules).forEach(([ruleName, message]) => {
  const forbiddenImports = {
    [`lodash/${ruleName}`]: 1,
    [`lodash.${ruleName.toLowerCase()}`]: 1,
  };

  // Can be removed when webapp/ is flattened
  // eslint-disable-next-line no-undef
  module.exports[ruleName] = {

    create(context) {
      return {
        CallExpression(node) {
          const { callee, parent } = node;
          const objectName = callee.name || (callee.object && callee.object.name);

          if (objectName === 'require' && node.arguments.length === 1) {
            const requiredModuleName = node.arguments[0].value;
            if (requiredModuleName === 'lodash') {
              const leftHandSide = getAssignmentLeftHandSide(parent);
              // ex: const { indexOf } = require('lodash');
              // ex: ({ indexOf } = require('lodash'));
              if (leftHandSide && leftHandSide.type === 'ObjectPattern') {
                leftHandSide.properties.forEach((property) => {
                  if (property.key.name === ruleName) {
                    context.report({ node, message });
                  }
                });
              }
            } else if (forbiddenImports[requiredModuleName]) {
              // ex: const indexOf = require('lodash.indexof');
              // ex: const indexOf = require('lodash/indexOf');
              context.report({ node, message });
            }
          } else if ((objectName === '_' || objectName === 'lodash' || objectName === 'underscore') && callee.property && callee.property.name === ruleName) {
            context.report({ node, message });
          }
        },
        ImportDeclaration(node) {
          if (node.source.value === 'lodash') {
            // ex: import { indexOf } from 'lodash';
            // ex: import { indexOf as x } from 'lodash';
            node.specifiers.forEach((specifier) => {
              if (specifier.type === 'ImportSpecifier' && specifier.imported.name === ruleName) {
                context.report({ node, message });
              }
            });
          } else if (forbiddenImports[node.source.value]) {
            // ex: import indexOf from 'lodash/indexOf';
            // ex: import indexOf from 'lodash.indexof';
            context.report({ node, message });
          }
        },
      };
    },
  };
});
