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
			overrideData : {},
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

		sheet.data = _.merge(sheet.data, this.props.overrideData);

		return <div className='printPage'>
			{RenderSheet(sheet.template, sheet.data)}
		</div>
	}
});

module.exports = PrintPage;
