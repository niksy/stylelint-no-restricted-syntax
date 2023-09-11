/**
 * @typedef {import('postcss').Declaration} Declaration
 * @typedef {import('../index.js').SyntaxRule} SyntaxRule
 */

import function_ from '../index.js';
import { runCodeTest } from './util/index.js';

// @ts-ignore
const { ruleName } = function_;

runCodeTest({
	ruleName: ruleName,
	config: [
		/** @type Array<SyntaxRule> */ ([
			{
				selector: 'rule[selector="a"]',
				message: 'Anchors not allowed.'
			},
			{
				selector: 'decl[prop="z-index"]',
				message: 'z-index not allowed.'
			},
			{
				selector: 'decl[prop="zoom"]',
				message: (node) =>
					`${/** @type Declaration */ (node).prop} not allowed.`
			}
		])
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
					text: 'Anchors not allowed. (plugin/no-restricted-syntax)'
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
					text: 'z-index not allowed. (plugin/no-restricted-syntax)'
				}
			]
		},
		{
			input: 'b { zoom:1.5 }',
			result: [
				{
					column: 5,
					endColumn: 13,
					endLine: 1,
					line: 1,
					text: 'zoom not allowed. (plugin/no-restricted-syntax)'
				}
			]
		}
	]
});
