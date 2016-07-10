var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var utils = require('../utils');

var Pip = React.createClass({
	getDefaultProps: function() {
		return {
			name : 'pip',
			defaultData : false,

			id : '',
			title : '',
			label : '',

			alt : false,
		};
	},


	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleChange : function(){
		this.updateData(!this.data());
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
				'fa-circle-o' : !this.data() && !this.props.alt,
				'fa-circle' : this.data()  && !this.props.alt,
				'fa-square-o' : !this.data() && this.props.alt,
				'fa-square' : this.data()  && this.props.alt,
			})}/>
			{this.renderLabel()}
		</div>
	}
});

module.exports = Pip;
