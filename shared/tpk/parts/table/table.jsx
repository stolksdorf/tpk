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

	renderFirstRow : function(){


	},

	render : function(){
		return <Box className='table' {...this.props}>
			{this.props.children}
		</Box>
	}
});

module.exports = Table;
