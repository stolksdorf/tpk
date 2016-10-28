const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const get = require('../utils.js').get;
const InternalBox = require('../internalBox/internalBox.jsx');

const StatBox = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'statBox',
			data : {
				value : '',
				mod : '',
				alt : '',
			},

			label : '',
			title : '',
			mod : false,
			alt : false,
		};
	},

	handleValueChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			value : e.target.value
		}));
	},

	handleModChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			mod : e.target.value
		}));
	},

	handleAltChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			alt : e.target.value
		}));
	},

	renderAlt : function(){
		if(!this.props.alt) return null;
		return <div className='alt'>
			<input type='text' onChange={this.handleAltChange} value={this.props.data.alt} />
		</div>
	},

	renderMod : function(){
		if(!this.props.mod) return null;
		return <div className='mod'>
			<input type='text' onChange={this.handleModChange} value={this.props.data.mod} />
		</div>
	},

	render : function(){
		return <InternalBox className='statBox' {...this.props} border={true}>
			{this.renderMod()}
			<input className='value' type='text' value={this.props.data.value} onChange={this.handleValueChange} />
			{this.renderAlt()}
		</InternalBox>
	}
});

module.exports = StatBox;
