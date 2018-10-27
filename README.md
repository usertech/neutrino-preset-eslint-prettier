# `@usertech/neutrino-preset-eslint-prettier`

> Work in Progress - the default eslint and prettier settings are open for discussion

Preset for neutrino which sets up `eslint` linting configured for use with `prettier`.

## Installation

    $ yarn add --dev usertech/neutrino-preset-eslint-prettier#0.0.7

## Usage

    // .neutrinorc.js
    module.exports = {
        use: [
            ['@usertech/neutrino-preset-eslint-prettier', {
                allowDev: true, // allow running on devserver, default is false
				eslint: {
					...
				}
			}]
        ],
    }

Create `.eslintrc.js` to provide config for your IDE.

    // .eslintrc.js
    const { Neutrino } = require("neutrino");

    module.exports = Neutrino({ root: __dirname })
    	.use(".neutrinorc.js")
    	.call("eslintrc");


Create `.prettierrc.js` to set up `@usertech` standard rules.

    // .prettierrc.js
    const { Neutrino } = require("neutrino");

    module.exports = Neutrino({ root: __dirname })
    	.use(".neutrinorc.js")
    	.call("prettierrc");

`lint` command is added in a same way as if `@neutrinojs/eslint` was used alone.

    {
      ...
      "scripts": {
        ...
        "lint": "neutrino lint",
        ...
      },
      ...
    }

So you can run

    $ yarn lint
    $ yarn lint --fix
