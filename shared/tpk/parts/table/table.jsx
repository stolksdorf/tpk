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

			count : 1,

			onChange : ()=>{}
		};
	},

	createChild : function(child, index, row){
		if(!React.isValidElement(child)) return null;
		if(!this.props.data[row]) this.props.data[row] = {};

		const id = get.id(child.props, index);

		const onChange = (val) => {
			this.props.data[row][id] = val;
			this.props.onChange(this.props.data);
		};

		return React.cloneElement(child, {
			onChange : onChange,
			data : this.props.data[row][id],
			title : '',
			label : '',
			id : id
		});
	},

	renderColumnTitles : function(){
		return React.Children.map(this.props.children, (child, index)=>{
			if(!React.isValidElement(child)) return null;
			const columnName = child.props.title || child.props.label || '';
			const width = get.width(child.props, 1);
			return <div className='columnTitle' width={width}>{columnName}</div>
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
			{this.renderColumnTitles()}
			{this.renderRows()}
		</InternalBox>
	}
});

module.exports = Table;
