var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var StatBar = React.createClass({
	getDefaultProps: function() {
		return {
			name : 'statbar',

			defaultData : {

			},

			label : '',
			flip : false
		};
	},

	render : function(){
		return <div className='statBar'>
			<div className='content'>
				<input type='text' />
				<div className='label'>{this.props.label}</div>
			</div>
		</div>
	}
});

module.exports = StatBar;
