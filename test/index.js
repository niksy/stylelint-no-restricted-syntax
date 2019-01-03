import fn from '../index';
import runTest from './util';

const { rule, ruleName, messages } = fn;

runTest(rule, {
	ruleName: ruleName,
	config: [[
		{
			selector: 'rule[selector="a"]',
			message: 'Anchors not allowed.'
		},
		{
			selector: 'decl[prop="z-index"]',
			message: 'z-index not allowed.'
		}
	]],
	skipBasicChecks: true,

	accept: [
		{
			code: 'b { font-weight:bold; }'
		},
		{
			code: 'span { background:green; }'
		}
	],
	reject: [
		{
			code: 'a { font-weight:bold }',
			message: messages.report('Anchors not allowed.')
		},
		{
			code: 'b { z-index:10 }',
			message: messages.report('z-index not allowed.')
		}
	]
});
