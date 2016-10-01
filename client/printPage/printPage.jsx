var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var RenderSheet = require('tpk/renderSheet.js');

var PrintPage = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				template : '',
				data : {},
				logic : ''
			},
			query : {}
		};
	},

	render : function(){
		var sheet = this.props.sheet;

		if(this.props.query.local){
			try{
				sheet = JSON.parse(localStorage.getItem(this.props.query.local));
				console.log(sheet);
			}catch(e){
				console.log(`err: could not load from ${this.props.query.local}`);
			}
		}

		return <div className='printPage'>
			{RenderSheet(sheet)}
		</div>
	}
});

module.exports = PrintPage;
