var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../navbar/navbar.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var SheetEditor = require('../sheetEditor/sheetEditor.jsx');
var SheetRenderer = require('../sheetRenderer/sheetRenderer.jsx');



var CharacterPage = React.createClass({

	getInitialState: function() {
		return {};
	},



	handleSplitMove : function(){
		//this.refs.editor.update();
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
				<SplitPane onDragFinish={this.handleSplitMove} ref='pane'>
					<SheetEditor
						ref='editor'

					/>
					<SheetRenderer
					/>
				</SplitPane>


			</div>
		</div>
	}
});

module.exports = CharacterPage;
