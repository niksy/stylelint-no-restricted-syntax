import plugin from './index';

// eslint-disable-next-line no-undef
testRule({
	plugins: ['.'],
	ruleName: plugin.ruleName,
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
			message: plugin.messages.report('Anchors not allowed.')
		},
		{
			code: 'b { z-index:10 }',
			message: plugin.messages.report('z-index not allowed.')
		}
	]
});

