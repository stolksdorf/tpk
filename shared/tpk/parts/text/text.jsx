var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

const get = require('../utils.js').get;

var Text = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'text',

			label : '',
			title : '',
			tag : '',


			right : false,
			center : false,

			small : false,
			large : false,
		};
	},

	render : function(){
		return <div className={cx('text', get.classes(this.props))} {...this.props} >
			{this.props.label || this.props.title || this.props.tag}
		</div>
	}
});

module.exports = Text;
