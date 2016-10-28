const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const get = require('../utils.js').get;
const InternalBox = require('../internalBox/internalBox.jsx');

const TextBox = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'textbox',
			data: '',

			fontSize : '',
			lines : false,
			title : '',
			label : '',

			is_box : true,
			print : false
		};
	},

	handleChange : function(e){
		this.props.onChange(e.target.value)
	},

	render : function(){
		return <InternalBox className='textBox' {...this.props}>
			<textarea
				style={{fontSize : this.props.fontSize}}
				value={this.props.data}
				onChange={this.handleChange} />
		</InternalBox>
	}
});


module.exports = TextBox;
