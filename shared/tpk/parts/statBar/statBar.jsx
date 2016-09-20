var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var StatBar = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'statbar',

			data : '',

			label : '',
			title : '',
		};
	},

	handleChange : function(e){
		this.props.onChange(e.target.value);
	},

	renderTitle : function(){
		if(this.props.title) return <div className='title'>{this.props.title}</div>
	},
	renderLabel : function(){
		if(this.props.label) return <div className='label'>{this.props.label}</div>
	},

	render : function(){
		return <div className={cx('statBar', {
			hasTitle : this.props.title,
			hasLabel : !this.props.title
		})} style={this.props.style}>
			<div className='content'>
				{this.renderTitle()}
				<div className='field'>
					<input type='text' value={this.props.data} onChange={this.handleChange} />
				</div>
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = StatBar;
