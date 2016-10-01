var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');


var Pip = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'pip',
			data : false,

			id : '',
			title : '',
			label : '',

			alt : false,
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

	render : function(){
		return <div className='pip' onClick={this.handleChange}>
			{this.renderTitle()}
			<i className={cx('fa', 'fa-fw', {
				'fa-circle-o' : !this.props.data && !this.props.alt,
				'fa-circle'   : this.props.data  && !this.props.alt,
				'fa-square-o' : !this.props.data && this.props.alt,
				'fa-square'   : this.props.data  && this.props.alt,
			})}/>
			{this.renderLabel()}
		</div>
	}
});

module.exports = Pip;
