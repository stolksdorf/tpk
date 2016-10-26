var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Skill = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'skill',
			data : {
				prof : false,
				expert : false,
				mod : ''
			},

			title : '',
			label : '',

			expert : false,
			alt : false
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
	handleModChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			mod : e.target.value
		}));
	},

	//TODO: Replace with pip elements?
	renderExpert : function(){
		if(!this.props.expert) return null;
		return <i onClick={this.handleToggleExpert} className={cx('expert', 'fa', 'fa-fw', {
			'fa-circle-o' : !this.props.data.expert && !this.props.alt,
			'fa-circle' : this.props.data.expert  && !this.props.alt,
			'fa-square-o' : !this.props.data.expert && this.props.alt,
			'fa-square' : this.props.data.expert  && this.props.alt,
			'alt' : this.props.alt
		})}/>
	},
	renderProf : function(){
		return <i onClick={this.handleToggleProf} className={cx('prof', 'fa', 'fa-fw', {
			'fa-circle-o' : !this.props.data.prof && !this.props.alt,
			'fa-circle' : this.props.data.prof  && !this.props.alt,
			'fa-square-o' : !this.props.data.prof && this.props.alt,
			'fa-square' : this.props.data.prof  && this.props.alt,
			'alt' : this.props.alt
		})}/>
	},
	render : function(){
		return <div className='skill'>
			{this.renderExpert()}
			{this.renderProf()}
			<input type='text' onChange={this.handleModChange} value={this.props.data.mod} />
			<label>
				{this.props.title}
				<small>{this.props.label}</small>
			</label>
		</div>
	}
});

module.exports = Skill;


//<Radio className='prof' value={this.props.data.prof} onChange={this.handleToggleProf} />