var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var get = require('../utils.js').get;

var Repeat = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'repeat',
			data : [],
			style : {},

			count : 1,

			onChange : ()=>{},

			needsParentProps : true,
			parentProps : {}
		}
	},


	cloneChild : function(child, idx){
		if(!React.isValidElement(child)) return null;
		var id = get.id(child.props);

		if(!this.props.data[idx]) this.props.data[idx] = {};

		var onChange = (val) => {
			if(id){
				this.props.data[idx] = _.assign({}, this.props.data[idx], {
					[id] : val
				});
				this.props.onChange(this.props.data);
			}else if(child.props.onChange){
				this.props.data[idx] = child.props.onChange(val);
				this.props.onChange(this.props.data);
			}else{
				//this.props.onChange(val);
			}
		};

		var style = {};

		if(get.width(child.props, 1)) style.width = `${get.width(child.props,1 ) / get.columns(this.props.parentProps) * 100}%`;
		if(get.rows(this.props.parentProps, false)) style.height = `${get.height(child.props, 1) / get.rows(this.props.parentProps) * 100}%`;

		return React.cloneElement(child, {
			onChange : onChange,
			data : (id ? this.props.data[idx][id] : this.props.data[idx]),
			style : _.assign({}, child.props.style, style),
		})


	},

	renderChildren : function(){
		return _.times(this.props.count, (idx) => {
			return React.Children.map(this.props.children, (child)=>{
				return this.cloneChild(child, idx)
			});
		});
	},

	render : function(){
		return <div className='repeat'>
			{this.renderChildren()}
		</div>
	}
});

module.exports = Repeat;
