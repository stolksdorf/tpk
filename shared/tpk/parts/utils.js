var _ = require('lodash');


module.exports = {

	get : {
		id : (props, index = '') => {
			return _.snakeCase(props.id || props.title || props.label || props.tag
				|| props.base_name + index);
		},

		width   : (props, def) => { return props.width || props.w || def },
		height  : (props, def) => { return props.height || props.h || def },

		rows    : (props, def=1) => { return props.rows || props.r || def },
		columns : (props, def=1) => { return props.columns || props.cols || props.col || props.c || def },
	},


	tryNum : (str) => {
		const t = _.toNumber(str);
		return (_.isNaN(t) || t == '' ? str : t);
	}.

/*

	//DEPRICATE
	id : function(){
		if(this.props.id) return this.props.id;
		if(this.props.title) return _.snakeCase(this.props.title);
		if(this.props.label) return _.snakeCase(this.props.label);
		return this.props.name;
	},
	data : function(){
		if(!this.id()) return this.props.data || this.props.defaultData;
		if(this.props.data && this.props.data[this.id()]) return this.props.data[this.id()];
		return this.props.defaultData;
	},
	updateData : function(val){
		if(typeof this.props.onChange !== 'function') throw "No onChange handler set";

		var newVal = val;

		//Clone the data if it's an object to avoid mutation bugs
		if(_.isObject(val)) newVal = _.extend({}, this.data(), val);

		if(this.id()){
			this.props.onChange({
				[this.id()] : newVal
			});
		}else{
			//If the box has no id, don't add it to the chain
			this.props.onChange(newVal)
		}
	}*/
}