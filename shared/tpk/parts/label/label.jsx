var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Label = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'label',

			text : '',
			t : '',

			right : false,
			center : false,
			fontSize : '1em'
		};
	},

	render : function(){
		var style = _.assign({}, this.props.style, {
			fontSize : this.props.fontSize,
			justifyContent : cx({
				"flex-end" : this.props.right,
				center : this.props.center,
			})
		});

		return <div className='label_element' style={style}>
			{this.props.text || this.props.t}
		</div>
	}
});

module.exports = Label;
