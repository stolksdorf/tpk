var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Renderer = require('../tpk/renderer/renderer.jsx');

var PrintPage = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				title : '',
				template : '',
				data : {},
				logic : ''
			}
		};
	},

	render : function(){
		return <div className='printPage'>
			<Renderer
				print={true}
				sheet={this.props.sheet} />
		</div>
	}
});

module.exports = PrintPage;
