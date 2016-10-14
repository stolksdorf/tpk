var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var utils = require('../utils');

var Button = React.createClass({

	getDefaultProps: function() {
		return {
			base_name : 'button',
			data : {
				pressed : false
			},

			label : '',
		};
	},

	handleClick : function(){
		this.props.onChange({
			pressed : !this.props.data.pressed
		});
	},

	render : function(){
		return <div className={cx('button', {'pressed' : this.props.data.pressed})} style={this.props.style} >
			<button onClick={this.handleClick}> {this.props.label} </button>
		</div>
	}
});

module.exports = Button;
