var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Box = require('../box/box.jsx');

var TextBox = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'textbox',
			data: '',

			fontSize : '',
			lines : false,
			title : '',
			label : '',

			is_box : true
		};
	},

	handleChange : function(e){
		this.props.onChange(e.target.value)
	},

	render : function(){
		return <Box className={cx('textBox', {lines : this.props.lines})} {...this.props}>
			<textarea style={{
					fontSize : this.props.fontSize
				}}
				value={this.props.data}
				onChange={this.handleChange} />
		</Box>
	}
});


module.exports = TextBox;
