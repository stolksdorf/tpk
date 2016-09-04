var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Box = require('../box/box.jsx');

var Sheet = React.createClass({
	getDefaultProps: function() {
		return {
			landscape : false,
			iso : false,
			author : '',
			version : ''
		};
	},

	render : function(){
		return <Box className={cx('sheet', {
				landscape : this.props.landscape,
				iso : this.props.iso,
				letter : !this.props.iso
			})} {...this.props}>
			{this.props.children}
		</Box>
	}
});

module.exports = Sheet;
