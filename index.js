/**
 * @typedef {object} Declaration
 * @typedef {object} SyntaxRule
 * @property {string} selector Selector for querying PostCSS AST.
 * @property {string} message  Error message for queried PostCSS node.
 */

import stylelint from 'stylelint';
import queryAst from 'postcss-query-ast';

const ruleName = 'plugin/no-restricted-syntax';

const messages = stylelint.utils.ruleMessages(ruleName, {
	/**
	 * @param {function|string} message
	 * @param {Declaration} node
	 * @returns
	 */
	report: (message, node) => {
		if (typeof message === 'function') {
			return message(node)
		}
		if (typeof message === 'string') {
			return message;
		}
	}
});

/**
 * @param {*} value
 */
function possibleValueTest(value) {
	return (
		Array.isArray(value) &&
		value.every(
			({ selector, message }) =>
				typeof selector === 'string' && typeof message === 'string'
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
					stylelint.utils.report({
						ruleName: ruleName,
						result: result,
						node: node,
						message: messages.report(message, node)
					});
				});
			});
	};
}

// @ts-ignore
const plugin = stylelint.createPlugin(ruleName, ruleFunction);

export default { ...plugin, messages };
