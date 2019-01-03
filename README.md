# stylelint-no-restricted-syntax

[![Build Status][ci-img]][ci]

Stylelint rule to disallow specified syntax, similar to ESLint [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax).

## Install

```sh
npm install stylelint-no-restricted-syntax --save
```

## Usage

Add this config to your `.stylelintrc`:

```json
{
	"plugins": [
		"stylelint-no-restricted-syntax"
	],
	"rules": {
		"plugin/no-restricted-syntax": [
			[{
				"selector": "rule[selector='a']",
				"message": "Anchors not allowed."
			},
			{
				"selector": "decl[prop='z-index']",
				"message": "z-index not allowed."
			}]
		]
	}
}
```

## Details

```css
a { z-index: 10; }
/**          ↑
 * Previous line will be considered as restricted syntax */
b { font-weight: bold; }
```

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.com/niksy/stylelint-no-restricted-syntax
[ci-img]: https://travis-ci.com/niksy/stylelint-no-restricted-syntax.svg?branch=master
