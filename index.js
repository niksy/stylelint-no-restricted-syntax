/**
 * @typedef {import('postcss').AnyNode} AnyNode
 *
 * @typedef {object} SyntaxRule
 * @property {string}         selector Selector for querying PostCSS AST.
 * @property {Message|string} message  Error message for queried PostCSS node.
 *
 * @typedef {(node: AnyNode) => string} Message
 */

import stylelint from 'stylelint';
import queryAst from 'postcss-query-ast';

const ruleName = 'plugin/no-restricted-syntax';

/**
 * @param   {Message|string} message
 * @param   {AnyNode}        node
 * @returns {string}
 */
const generateMessage = (message, node) =>
	typeof message === 'function' ? message(node) : message;

/**
 * @param {*} value
 */
function possibleValueTest(value) {
	return (
		Array.isArray(value) &&
		value.every(
			({ selector, message }) =>
				typeof selector === 'string' &&
				(typeof message === 'string' || typeof message === 'function')
		)
	);
}

/**
 * @type {stylelint.RuleBase}
 */
function ruleFunction(/** @type {SyntaxRule[]}*/ syntaxRules) {
	return async function (cssRoot, result) {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: syntaxRules,
			possible: possibleValueTest
		});

		if (!validOptions) {
			return;
		}

		const queries = await Promise.all(
			syntaxRules.map(({ selector }) => queryAst(selector, cssRoot))
		);

		queries
			.map((nodes, index) => ({
				nodes: nodes,
				message: syntaxRules[index].message
			}))
			.filter(({ nodes }) => nodes.length !== 0)
			.forEach(({ nodes, message }) => {
				nodes.forEach((node) => {
					const formattedMessage = stylelint.utils.ruleMessages(
						ruleName,
						{ reject: generateMessage(message, node) }
					);

					stylelint.utils.report({
						ruleName: ruleName,
						result: result,
						node: node,
						message: formattedMessage.reject
					});
				});
			});
	};
}

// @ts-ignore
const plugin = stylelint.createPlugin(ruleName, ruleFunction);

export default { ...plugin };
