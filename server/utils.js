const _ = require('lodash');
const random = require('randomstring');


module.exports = {
	genId : (prefix = '') => {
		const opts = {
			length: 4,
			charset: 'alphanumeric',
			capitalization : 'lowercase'
		};

		const rand = _.times(3, ()=>{
			return random.generate(opts)
		}).join('-');

		return `${prefix}-${rand}`;
	},

}

