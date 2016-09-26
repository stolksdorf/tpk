var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Box = require('../box/box.jsx');

const tryNum = (str) => {
	const t = _.toNumber(str);
	return (_.isNaN(t) || t == '' ? str : t);
}

var StatBox = React.createClass({
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
			value : tryNum(e.target.value)
		}));
	},

	handleModChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			mod : tryNum(e.target.value)
		}));
	},

	handleAltChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			alt : tryNum(e.target.value)
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

		return <Box
				className={cx('statBox', {hasMod : !!this.props.mod, hasAlt : !!this.props.alt})}
				border={true}
				label={this.props.label}
				title={this.props.title}
				style={this.props.style}
				is_internal={true}
				>
			{this.renderMod()}
			<input className='value' type='text' value={this.props.data.value} onChange={this.handleValueChange} />
			{this.renderAlt()}
		</Box>
	}
});

module.exports = StatBox;
