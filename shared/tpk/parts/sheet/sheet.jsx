var React = require('react');
var _ = require('lodash');
var cx = require('classnames');


var Box = require('../box/box.jsx');
var Pack = require('../pack/pack.jsx');

var Sheet = React.createClass({
	getDefaultProps: function() {
		return {
			data : {},
			landscape : false,
			iso : false,

			flow : 'vertical' //horiztonal
		};
	},

/*
	render : function(){
		return <div className={cx('sheet', {
				landscape : this.props.landscape,
				iso : this.props.iso,
				letter : !this.props.iso,
				guides : this.props.guides
			})}>
			<Box {...this.props}>
				{this.props.children}
			</Box>
		</div>
	}
*/
	render : function(){
		return <div className={cx('sheet', {
				landscape : this.props.landscape,
				iso : this.props.iso,
				letter : !this.props.iso,
				guides : this.props.guides
			})}>
			<Pack {...this.props}>
				{this.props.children}
			</Pack>
		</div>
	}
});

module.exports = Sheet;
