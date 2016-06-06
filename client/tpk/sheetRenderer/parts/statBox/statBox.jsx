var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Box = require('../box/box.jsx');
var utils = require('../utils');

var StatBox = React.createClass({
	getDefaultProps: function() {
		return {
			name : 'statBox',
			defaultData : {
				value : '',
				mod : ''
			},

			mod : false
		};
	},

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleValueChange : function(e){
		this.updateData({
			value : e.target.value
		})
	},

	handleModChange : function(){
		this.updateData({
			mod : e.target.value
		})
	},

	renderMod : function(){
		if(!this.props.mod) return null;

		return <input className='mod' type='text' onChange={this.handleModChange} value={this.data().mod} />
	},

	render : function(){
		return <Box className={cx('statBox', {mod : this.props.mod})} {...this.props}>
			{this.renderMod()}
			<input type='text' value={this.data().value} onChange={this.handleValueChange} />
			}
		</Box>
	}
});

module.exports = StatBox;
