import assert from 'assert';
import stylelint from 'stylelint';

setTimeout(run, 0);

export default stylelint.createRuleTester(( processCss, ctx ) => {
	describe(ctx.caseDescription, function () {
		it(ctx.completeAssertionDescription, function () {
			return processCss.then(( comparisons ) => {
				comparisons.forEach(({ actual, expected, description }) => {
					assert.equal(actual, expected, description);
				});
			});
		});
	});
});
