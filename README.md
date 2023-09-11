# stylelint-no-restricted-syntax

[![Build Status][ci-img]][ci]

Stylelint rule to disallow specified syntax, similar to ESLint
[`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax).

## Install

```sh
npm install stylelint-no-restricted-syntax --save
```

## Usage

Add this config to your `.stylelintrc`:

```json
{
	"plugins": ["stylelint-no-restricted-syntax"],
	"rules": {
		"plugin/no-restricted-syntax": [
			[
				{
					"selector": "rule[selector='a']",
					"message": "Anchors not allowed."
				},
				{
					"selector": "decl[prop='z-index']",
					"message": "z-index not allowed."
				}
			]
		]
	}
}
```

If using a JavaScript config file (e.g., `stylelint.config.cjs`), you may also
use a function that returns a message:

```js
module.exports = {
	'plugins': ['stylelint-no-restricted-syntax'],
	'rules': {
		'plugin/no-restricted-syntax': [
			[
				{
					'selector': "decl[prop='z-index']",
					'message': (node) => `${node.prop} not allowed.`
				}
			]
		]
	}
};
```

## Options

Each restricted syntax rule consists of the following properties:

| Property   | Type               | Description                                                                                                  |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `selector` | `string`           | Selector for querying PostCSS AST.                                                                           |
| `message`  | `string\|function` | Error message for queried PostCSS node. If using a function, the provided argument is the full PostCSS node. |

## Details

```css
a {
	z-index: 10;
}
/**          ↑
 * Previous line will be considered as restricted syntax */
b {
	font-weight: bold;
}
```

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://github.com/niksy/stylelint-no-restricted-syntax/actions?query=workflow%3ACI
[ci-img]: https://github.com/niksy/stylelint-no-restricted-syntax/workflows/CI/badge.svg?branch=master

<!-- prettier-ignore-end -->
