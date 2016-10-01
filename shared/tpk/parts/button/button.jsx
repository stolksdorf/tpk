var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var utils = require('../utils');

var Button = React.createClass({

	getDefaultProps: function() {
		return {
			base_name : 'button',
			data : {
				clicked : false
			},

			label : '',
		};
	},

	handleClick : function(){
		this.props.onChange({
			clicked : !this.props.data.clicked
		});
	},

	render : function(){
		return <div className={cx('button', {'clicked' : this.props.data.clicked})} style={this.props.style} >
			<button onClick={this.handleClick}> {this.props.label} </button>
		</div>
	}
});

module.exports = Button;
