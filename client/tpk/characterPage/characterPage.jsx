var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../navbar/navbar.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var SheetEditor = require('../sheetEditor/sheetEditor.jsx');
var SheetRenderer = require('../sheetRenderer/sheetRenderer.jsx');

var Editor = require('../editor/editor.jsx');
var Actions = require('tpk/actions.js');




var CharacterPage = React.createClass({

	getInitialState: function() {
		return {
			dividerColor : '#ddd',

		};
	},

	componentDidMount: function() {
		Actions.loadFromLocalStorage('TEMP_ID');
	},




	handleSplitMove : function(){
		//this.refs.editor.update();
	},

	handleEditorTypeChange : function(type, color){

		this.setState({
			dividerColor : color
		})
	},



	render : function(){
		return <div className='page characterPage'>
			<Navbar>
				<Nav.section>
					<Nav.item>
						yo dawg
					</Nav.item>
				</Nav.section>
			</Navbar>

			<div className='content'>
				<SplitPane onDragFinish={this.handleSplitMove} ref='pane' color={this.state.dividerColor}>
					<Editor
						ref='editor'
						onEditorTypeChange={this.handleEditorTypeChange}
					/>
					<SheetRenderer
					/>
				</SplitPane>


			</div>
		</div>
	}
});

module.exports = CharacterPage;
