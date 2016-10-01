var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

//TODO: NOt used yet, maybe split this logic up??

//Handles toggling of the editor, potentially useful for when we have async data processing?


var SheetView = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				info : {},
				template : '',
				logic : '',
				data : {}
			},

			showEditor : true,

			onInfoChange : ()=>{},
			onTemplateChange : ()=>{},
			onLogicChange : ()=>{},
			onDataChange : ()=>{},
		};
	},

	getInitialState: function() {
		return {
			showEditor : true,

			errors : null,

		};
	},




	render : function(){
		return <div className='sheetView'>
			SheetView Component Ready.
		</div>
	}
});

module.exports = SheetView;
