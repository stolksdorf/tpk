const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const get = require('../utils.js').get;
var Box = require('../box/box.jsx');

const Table = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'table',
			data : [],
			style : {},

			count : 1,

			onChange : ()=>{},

			needsParentProps : true,
			parentProps : {}
		};
	},

	createChild : function(child, index, row){
		if(!React.isValidElement(child)) return null;

		if(!this.props.data[row]) this.props.data[row] = {};

		const id = get.id(child.props, index);
		const columnName = child.props.title || child.props.title || '';

		const onChange = (val) => {
			console.log(id, val);


			if(child.props.onChange){
				return child.props.onChange(val);
			}else if(id){
				this.props.data[row][id] = val;
				console.log('here', this.props.data);
				this.props.onChange(this.props.data);
			}
		};

		console.log(row, id, this.props.data[row][id]);


	var ch = React.cloneElement(child, {
			onChange : onChange,
			data : this.props.data[row][id],
			//style : _.assign({}, child.props.style, style),
			//parentProps : (child.props.needsParentProps? this.props : null)
		});

	console.log(ch);


		return React.cloneElement(child, {
			onChange : onChange,
			//data : this.props.data[row][id],
			//style : _.assign({}, child.props.style, style),
			//parentProps : (child.props.needsParentProps? this.props : null)
		});


	},

	renderFirstRow : function(){

		return React.Children.map(this.props.children, (child, index)=>{
			return this.createChild(child, index, 3);
		});
	},

	render : function(){
		console.log('render data', this.props.data);
		return <div className='table' {...this.props} is_internal={true}>
			{this.renderFirstRow()}
		</div>
	}
});

module.exports = Table;
