const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const get = require('../utils.js').get;
const InternalBox = require('../internalBox/internalBox.jsx');

const Table = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'table',
			data : [],
			style : {},

			count : 1,

			onChange : ()=>{}
		};
	},

	createChild : function(child, index, row){
		if(!React.isValidElement(child)) return null;
		if(!this.props.data[row]) this.props.data[row] = {};
		const id = get.id(child.props, index);
		const columnName = child.props.title || child.props.label || '';
		const onChange = (val) => {
			this.props.data[row][id] = val;
			this.props.onChange(this.props.data);
		};

		return React.cloneElement(child, {
			onChange : onChange,
			data : this.props.data[row][id],
			title : (row == 0 ? columnName : ''),
			label : '',
			id : id
		});
	},

	renderRows : function(rowIndex){
		return _.times(this.props.count, (rowIndex)=> {
			return React.Children.map(this.props.children, (child, index)=>{
				return this.createChild(child, index, rowIndex);
			});
		});
	},
	render : function(){
		return <InternalBox className='table' {...this.props}>
			{this.renderRows()}
		</InternalBox>
	}
});

module.exports = Table;
