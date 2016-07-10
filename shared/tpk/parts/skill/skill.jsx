var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

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

			//id : '',
			//label : '',

			expert : false,
			alt : false
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
			expert : !this.data().expert
		})
	},
	handleModChange : function(e){
		this.updateData({
			mod : e.target.value
		})
	},
	renderExpert : function(){
		if(!this.props.expert) return null;
		return <i onClick={this.handleToggleExpert} className={cx('expert', 'fa', 'fa-fw', {
			'fa-circle-o' : !this.data().expert && !this.props.alt,
			'fa-circle' : this.data().expert  && !this.props.alt,
			'fa-square-o' : !this.data().expert && this.props.alt,
			'fa-square' : this.data().expert  && this.props.alt,
		})}/>
	},
	renderProf : function(){
		return <i onClick={this.handleToggleProf} className={cx('prof', 'fa', 'fa-fw', {
			'fa-circle-o' : !this.data().prof && !this.props.alt,
			'fa-circle' : this.data().prof  && !this.props.alt,
			'fa-square-o' : !this.data().prof && this.props.alt,
			'fa-square' : this.data().prof  && this.props.alt,
		})}/>
	},
	render : function(){
		return <div className='skill'>
			{this.renderExpert()}
			{this.renderProf()}
			<input type='text' onChange={this.handleModChange} value={this.data().mod} />
			<label>
				{this.props.title}
				<small>{this.props.label}</small>
			</label>
		</div>
	}
});

module.exports = Skill;


//<Radio className='prof' value={this.data().prof} onChange={this.handleToggleProf} />