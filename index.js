const deepmerge = require('deepmerge');
const eslint = require('@neutrinojs/eslint');

const prettierrc = () => {
	return {
		printWidth: 100,
		parser: 'typescript',
		useTabs: true,
		singleQuote: true,
		trailingComma: 'all',
		arrowParens: 'always',
	};
};

module.exports = (neutrino, { eslint: eslintOptions = {}, allowDev = false } = {}) => {
	// workaround https://github.com/neutrinojs/neutrino/issues/1091
	neutrino.options.extensions = ['js', 'jsx', 'vue', 'mjs'];

    const defaultOptions = {
		failOnError: process.env.NODE_ENV !== 'development',
		cwd: neutrino.options.root,
		useEslintrc: false,
		baseConfig: {
			extends: [
				'eslint:recommended',
				'plugin:react/recommended',
				'prettier',
			],
		},
		plugins: ['prettier'],
		// envs: ['es6'],
		parserOptions: {
			ecmaVersion: 2018,
			sourceType: 'module',
		},
		globals: ['process', 'window', 'document', 'navigator', 'console', 'fetch', 'module'],
		rules: {
			'prettier/prettier': ['error', {}],
			'react/prop-types': 0,
		},
	}

    const mergedOptions = deepmerge(defaultOptions, eslintOptions);

	// do not lint when running devserver
	if (neutrino.options.command !== 'start' || allowDev) {
		neutrino.use(eslint, {
	        test: neutrino.regexFromExtensions(),
	        include: [neutrino.options.source, neutrino.options.tests],
	        exclude: [],
	        eslint: mergedOptions
		})
	}
	neutrino.register(
		'prettierrc',
		prettierrc,
		'Return an object of accumulated Prettier configuration suitable for use by .prettierrc.js',
	);
};
