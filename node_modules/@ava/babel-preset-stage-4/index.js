'use strict';
/* eslint-disable import/no-dynamic-require */
function buildPreset() {
	const plugins = require(`./plugins/best-match`)
		.map(module => require(module));

	return {plugins};
}
module.exports = buildPreset;
