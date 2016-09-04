var React = require('react');
var _ = require('lodash');
var cx = require('classnames');


//var Actions = require('tpk/actions.js');

/*

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('./navbar/navbar.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var SheetEditor = require('./sheetEditor/sheetEditor.jsx');
var SheetRenderer = require('./sheetRenderer/sheetRenderer.jsx');


var Process = require('./process.js');


const TPK_TEMPLATE = 'tpk_template';
const TPK_LOGIC = 'tpk_logic';

const SPLATSHEET_DATA = 'splatsheet_data';
*/

var CharacterPage = require('./characterPage/characterPage.jsx');


var TPK = React.createClass({
	getDefaultProps: function() {
		return {
			base_template : ''
		};
	},

	componentDidMount: function() {

		/*
		Actions.setDefaults({
			template : this.props.base_template
		});
		*/

		document.addEventListener('keydown', this.preventSaveShortcut);
	},
	componentWillUnmount: function() {
		document.removeEventListener('keydown', this.preventSaveShortcut);
	},

	preventSaveShortcut : function(e){
		if(e.keyCode == 83 && (e.metaKey || e.ctrlKey)){
			e.stopPropagation();
			e.preventDefault();
		}
	},



	render : function(){
		return <div className='tpk'>
			<CharacterPage />
		</div>
	}
});

module.exports = TPK;
