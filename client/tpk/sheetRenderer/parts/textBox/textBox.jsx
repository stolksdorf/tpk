var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Box = require('../box/box.jsx');
var utils = require('../utils');

var TextBox = React.createClass({
	getDefaultProps: function() {
		return {
			name : 'textbox',
			defaultData : '',

			id : '',
			label : '',

			lines : false
		};
	},

	TEST : 'YO DAWG',

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleChange : function(e){
		this.updateData(e.target.value);
	},

	render : function(){
		return <Box className={cx('textBox', {lines : this.props.lines})} {...this.props}>
			<textarea value={this.data()} onChange={this.handleChange} />
		</Box>
	}
});


module.exports = TextBox;
