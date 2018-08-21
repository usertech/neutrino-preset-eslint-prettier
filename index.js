// const deepmerge = require('deepmerge');
const eslint = require('@neutrinojs/eslint');

const prettierrc = () => {
	return {
		printWidth: 100,
		parser: 'flow',
		useTabs: true,
		singleQuote: true,
		trailingComma: 'all',
		arrowParens: 'always',
	};
};

module.exports = (neutrino, { eslint: eslintOptions = {} } = {}) => {
	neutrino.use(eslint, {
		test: neutrino.regexFromExtensions(),
		include: [neutrino.options.source, neutrino.options.tests],
		exclude: [],
		eslint: {
			failOnError: process.env.NODE_ENV !== 'development',
			cwd: neutrino.options.root,
			useEslintrc: false,
			baseConfig: {
				extends: [
					'eslint:recommended',
					'plugin:react/recommended',
					'plugin:flowtype/recommended',
					'prettier',
				],
			},
			plugins: ['prettier', 'flowtype'],
			// envs: ['es6'],
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: 'module',
			},
			globals: ['process', 'window', 'document', 'navigator', 'console', 'fetch'],
			rules: {
				'prettier/prettier': ['error', {}],
			},
		},
	});
	neutrino.register(
		'prettierrc',
		prettierrc,
		'Return an object of accumulated Prettier configuration suitable for use by .prettierrc.js',
	);
};
