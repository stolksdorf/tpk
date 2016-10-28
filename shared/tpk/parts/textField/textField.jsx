const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const get = require('../utils.js').get;

const TextField = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'textField',
			data : '',

			title : '',
			label : '',
			tag : '',

			shadow : false,
			line : true,
			fontSize : '',
		};
	},

	handleChange : function(e){
		this.props.onChange(e.target.value);
	},

	renderTitle : function(){
		if(this.props.title) return <h5 className='title'>{this.props.title}</h5>
	},
	renderLabel : function(){
		if(this.props.label) return <h5 className='label'>{this.props.label}</h5>
	},
	renderTag : function(){
		if(this.props.tag) return <div className='tag'>{this.props.tag}</div>
	},

	render : function(){
		//conditionally add on style if w or height was set?
		const style = {
			width : this.props.style.width,
			fontSize : this.props.fontSize
		};

		return <div className={cx('textField', get.classes(this.props), {
			line   : !!this.props.line && !this.props.shadow,
		})} style={style}>
			{this.renderTitle()}
			{this.renderTag()}
			<input type='text' value={this.props.data} onChange={this.handleChange} />
			{this.renderLabel()}
		</div>
	}
});

module.exports = TextField;
