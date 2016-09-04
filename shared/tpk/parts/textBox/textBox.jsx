var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Box = require('../box/box.jsx');
var utils = require('../utils');

var TextBox = React.createClass({
	getDefaultProps: function() {
		return {

			id : '',
			label : '',

			onChange : ()=> {},

			name : 'textbox',
			data: ' ',

			fontSize : '',
			lines : false
		};
	},


	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,



	handleChange : function(e){
		this.props.onChange(e.target.value)
	},

	render : function(){

		return <Box className={cx('box textBox', {lines : this.props.lines})} {...this.props}>
			<textarea style={{fontSize : this.props.fontSize}} value={this.props.data} onChange={this.handleChange} />
		</Box>
	}
});


module.exports = TextBox;
