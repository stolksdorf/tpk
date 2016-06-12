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
				mod : '',
				alt : '',
			},

			mod : false,
			alt : false,

			width : false,

			border : true,
		};
	},

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleValueChange : function(e){
		this.updateData({
			value : e.target.value
		});
	},

	handleModChange : function(e){
		this.updateData({
			mod : e.target.value
		});
	},

	handleAltChange : function(e){
		this.updateData({
			alt : e.target.value
		})
	},

	renderAlt : function(){
		if(!this.props.alt) return null;
		return <div className='alt'>
			<input type='text' onChange={this.handleAltChange} value={this.data().alt} />
		</div>
	},

	renderMod : function(){
		if(!this.props.mod) return null;
		return <div className='mod'>
			<input type='text' onChange={this.handleModChange} value={this.data().mod} />
		</div>
	},

	render : function(){
		return <Box className={cx('statBox', {mod : this.props.mod, alt : this.props.alt})} {...this.props}>
			{this.renderMod()}
			<input className='value' type='text' value={this.data().value} onChange={this.handleValueChange} />
			{this.renderAlt()}
		</Box>
	}
});

module.exports = StatBox;
