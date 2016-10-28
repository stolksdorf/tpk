var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

const Pip = require('../pip/pip.jsx');

var Skill = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'skill',
			data : {
				prof : false,
				expert : false,
				value : ''
			},

			title : '',
			label : '',

			expert : false,

			//For pips
			alt : false,
			mod : false,
			star : false,
		};
	},

	handleToggleProf : function(){
		this.props.onChange(_.assign({}, this.props.data, {
			prof : !this.props.data.prof
		}));
	},
	handleToggleExpert : function(val){
		this.props.onChange(_.assign({}, this.props.data, {
			expert : !this.props.data.expert
		}));
	},
	handleValueChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			value : e.target.value
		}));
	},

	getPipProps : function(){
		return {
			alt : this.props.alt,
			mod : this.props.mod,
			star : this.props.star
		};
	},

	renderExpert : function(){
		if(!this.props.expert) return null;
		return <Pip
			data={this.props.data.expert}
			onChange={this.handleToggleExpert}
			className='expert' {...this.getPipProps()} />

	},
	renderProf : function(){
		return <Pip
			data={this.props.data.prof}
			onChange={this.handleToggleProf}
			className='prof' {...this.getPipProps()} />
	},
	render : function(){
		return <div className='skill'>
			{this.renderExpert()}
			{this.renderProf()}
			<input type='text' onChange={this.handleValueChange} value={this.props.data.value} />
			<label>
				{this.props.title}
				<small>{this.props.label}</small>
			</label>
		</div>
	}
});

module.exports = Skill;


//<Radio className='prof' value={this.props.data.prof} onChange={this.handleToggleProf} />