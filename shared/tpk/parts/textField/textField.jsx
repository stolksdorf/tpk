var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var TextField = React.createClass({
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
			print : false
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

	renderField : function(){
		if(this.props.print) return <div className='field'>{this.props.data}</div>
		return <input className='field' type='text' value={this.props.data} onChange={this.handleChange} />
	},


	render : function(){

		//conditionally add on style if w or height was set?
		var style = {
			width : this.props.style.width,
			fontSize : this.props.fontSize
		};

		return <div className={cx('textField', {
			hasTag    : !!this.props.tag,
			shadow : !!this.props.shadow,
			line   : !!this.props.line && !this.props.shadow,
		})} style={style}>
			{this.renderTitle()}
			{this.renderTag()}
			<input className='field' type='text' value={this.props.data} onChange={this.handleChange} />
			{this.renderLabel()}
		</div>
	},


	renderPrint : function(){
		return <div>Print dog</div>
	}
});

module.exports = TextField;
