import function_ from '../index.js';
import { runCodeTest } from './util/index.js';

// @ts-ignore
const { ruleName, messages } = function_;

runCodeTest({
	ruleName: ruleName,
	config: [
		[
			{
				selector: 'rule[selector="a"]',
				message: 'Anchors not allowed.'
			},
			{
				selector: 'decl[prop="z-index"]',
				message: 'z-index not allowed.'
			}
		]
	],

	accept: [
		{
			input: 'b { font-weight:bold; }',
			result: []
		},
		{
			input: 'span { background:green; }',
			result: []
		}
	],
	reject: [
		{
			input: 'a { font-weight:bold }',
			result: [
				{
					column: 1,
					endColumn: 23,
					endLine: 1,
					line: 1,
					text: messages.report('Anchors not allowed.')
				}
			]
		},
		{
			input: 'b { z-index:10 }',
			result: [
				{
					column: 5,
					endColumn: 15,
					endLine: 1,
					line: 1,
					text: messages.report('z-index not allowed.')
				}
			]
		}
	]
});
