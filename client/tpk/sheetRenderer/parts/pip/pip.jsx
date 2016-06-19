var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var utils = require('../utils');

var Pip = React.createClass({

	getDefaultProps: function() {
		console.log(this.handleChange);
		return {
			name : 'pip',
			defaultData : false,

			id : '',
			title : '',
			label : '',

			star : false,
			//onChange : false
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
			<i className={cx('fa', {
				'fa-circle-o' : !this.data() && !this.props.star,
				'fa-circle' : this.data()  && !this.props.star,
				'fa-star-o' : !this.data() && this.props.star,
				'fa-star' : this.data()  && this.props.star,
			})}/>
			{this.renderLabel()}
		</div>
	}
});

module.exports = Pip;
