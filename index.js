import stylelint from 'stylelint';
import queryAst from 'postcss-query-ast';

const ruleName = 'plugin/no-restricted-syntax';

const messages = stylelint.utils.ruleMessages(ruleName, {
	report: (message) => message
});

/**
 * @param {object[]} value
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

const plugin = stylelint.createPlugin(
	ruleName,
	(syntaxRules) => async (cssRoot, result) => {
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
						message: messages.report(message)
					});
				});
			});
	}
);

export default { ...plugin, messages };
