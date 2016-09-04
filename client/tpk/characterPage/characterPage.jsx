var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../navbar/navbar.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var Renderer = require('../renderer/renderer.jsx');
var Editor = require('../editor/editor.jsx');


var CharacterPage = React.createClass({

	getInitialState: function() {
		return {
			dividerColor : '#ddd',

			sheet : {
				template : '',
				data : {},
				logic : ''
			}

		};
	},

	componentDidMount: function() {
		try{
			var sheet = localStorage.getItem('SHEET');
			this.setState({
				sheet : _.assign({
					template : '',
					data : {},
					logic : ''
				}, JSON.parse(sheet))
			});
		}catch(e){

		}
	},


	handleSheetUpdate : function(newSheet){
		this.setState({
			sheet : newSheet
		})
		localStorage.setItem('SHEET', JSON.stringify(newSheet));
	},

	handleDividerColorChange : function(color){
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
				<SplitPane ref='pane' color={this.state.dividerColor}>
					<Editor
						sheet={this.state.sheet}
						onDividerColorChange={this.handleDividerColorChange}
						onChange={this.handleSheetUpdate}
					/>
					<Renderer
						sheet={this.state.sheet}
						onChange={this.handleSheetUpdate}
					/>
				</SplitPane>
			</div>
		</div>
	}
});

module.exports = CharacterPage;
