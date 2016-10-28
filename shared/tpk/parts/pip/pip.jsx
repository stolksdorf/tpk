var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');


var Pip = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'pip',
			data : false,

			title : '',
			label : '',

			alt : false,
			mod : false,
			star : false
		};
	},

	handleChange : function(){
		this.props.onChange(!this.props.data);
	},
	renderTitle : function(){
		if(!this.props.title) return;
		return <span className='title'>{this.props.title}</span>
	},
	renderLabel : function(){
		if(!this.props.label) return;
		return <span className='label'>{this.props.label}</span>
	},

	getIcon : function(){
		let icon = ['circle', 'circle-o'];
		if(this.props.star) icon = ['star', 'star-o'];
		if(this.props.alt) icon = ['square', 'square-o'];
		if(this.props.mod) icon = ['toggle-on', 'toggle-off'];

		return `fa-${this.props.data ? icon[0] : icon[1]}`;
	},

	render : function(){
		return <div
			className={cx('pip', this.props.className)}
			style={this.props.style}
			onClick={this.handleChange}>
			{this.renderTitle()}
			<i className={cx('fa', 'fa-fw', this.getIcon())}/>
			{this.renderLabel()}
		</div>
	}
});

module.exports = Pip;
