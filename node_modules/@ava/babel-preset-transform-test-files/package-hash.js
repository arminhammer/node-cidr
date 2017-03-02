'use strict';
const packageHash = require('package-hash');

module.exports = packageHash.sync([
	require.resolve('./package.json'),
	require.resolve('babel-plugin-espower/package.json'),
	require.resolve('babel-plugin-ava-throws-helper/package.json')
]);
