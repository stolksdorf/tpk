var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Radio = require('../radio.jsx');
var utils = require('../utils');

var Skill = React.createClass({
	getDefaultProps: function() {
		return {
			name : 'skill',
			defaultData : {
				prof : false,
				expert : false,
				mod : ''
			},

			id : '',
			label : '',
			expert : false
		};
	},

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleToggleProf : function(){
		this.updateData({
			prof : !this.data().prof
		})
	},
	handleToggleExpert : function(val){
		this.updateData({
			expert : val
		})
	},
	handleModChange : function(e){
		this.updateData({
			mod : e.target.value
		})
	},
	renderExpert : function(){
		if(!this.props.expert) return null;
		return <Radio className='expert' value={this.data().expert} onChange={this.handleToggleExpert} />
	},
	render : function(){
		return <div className='skill'>
			{this.renderExpert()}
			<Radio className='prof' value={this.data().prof} onChange={this.handleToggleProf} />
			<input type='text' onChange={this.handleModChange} value={this.data().mod} />
			<label>
				{this.props.title}
				<small>{this.props.label}</small>
			</label>
		</div>
	}
});

module.exports = Skill;
