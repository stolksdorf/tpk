const _ = require('lodash');

const PropNames = ['shadow','border','space','expand','lines', 'guides'];
const Toggles = ['label','title','mod','alt', 'tag'];

module.exports = {

	get : {
		id : (props, index = '') => {
			const id = props.id || props.title || props.label || props.tag;
			if(id) return _.snakeCase(id);
			if(props.base_name) return _.snakeCase(props.base_name + index);
		},

		width   : (props, def) => { return props.width || props.w || def },
		height  : (props, def) => { return props.height || props.h || def },

		rows    : (props, def=1) => { return props.rows || props.r || def },
		columns : (props, def=1) => { return props.columns || props.cols || props.col || props.c || def },

		classes : (props) => {
			const classes = _.filter(PropNames, (name)=>{ return !!props[name]; });
			_.each(Toggles, (toggle) => {
				if(!!props[toggle]){
					classes.push(`has${_.capitalize(toggle)}`);
				}
			})
			return classes;
		}
	},


}