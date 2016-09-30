var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var Renderer = require('../../renderer/renderer.jsx');
var Editor = require('../../editor/editor.jsx');


const KEY = 'NEW_PAGE';


var NewPage = React.createClass({

	getInitialState: function() {
		return {
			/*
			sheet : {
				title : '',
				template : '',
				data : {},
				logic : ''
			},
			*/

			info : {
				title : '',
				desc : '',
				published : false
			},
			template : '',
			data : {},
			logic : '',



			showEditor : true,
			isSaving : false,
			errors : []
		};
	},

	componentDidMount: function() {
		try{
			var sheet = localStorage.getItem(KEY);
			this.setState(JSON.parse(sheet));
		}catch(e){}
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
	},

	getSheet : function(){
		return {
			info : this.state.info,
			template : this.state.template,
			data : this.state.data,
			logic : this.state.logic
		}
	},

	saveSheetToLocal : function(){
		localStorage.setItem(KEY, JSON.stringify(this.getSheet()));
	},


	handleSheetUpdate : function(newSheet){
		this.setState(newSheet, this.saveSheetToLocal);
	},

	handleDataChange : function(newData){
		this.setState({
			data : newData
		}, this.saveSheetToLocal);
	},

	handleTitleChange : function(title){
		this.setState({
			info : _.assign({}, this.state.info, {title : title})
		}, this.saveSheetToLocal);
	},

	handleEditorShowChange : function(val){
		this.setState({
			showEditor : val
		});
	},


	handleSave : function(){
		this.setState({
			isSaving : true,
			errors : null
		});

		request.post('/api/sheet')
			.send(this.getSheet())
			.end((err, res)=>{
				if(err){
					this.setState({
						isSaving : false,
						errors : err
					});
					return;
				}
				window.onbeforeunload = function(){};
				var sheet = res.body;
				//TODO: Uncomment later
				//localStorage.removeItem(KEY);
				window.location = `/edit/${sheet.editId}/${_.snakeCase(sheet.title)}`;
			})
	},



	renderSaveButton : function(){
		if(this.state.isSaving){
			return <Nav.item icon='fa-spinner fa-spin' className='saveButton'>
				save...
			</Nav.item>
		}else{
			return <Nav.item icon='fa-save' className='saveButton' onClick={this.handleSave}>
				save
			</Nav.item>
		}
	},

	renderNavbar : function(){
		return <Navbar ver={this.props.ver}>
			{/*
			<Nav.section>
				<EditTitle title={this.state.info.title} onChange={this.handleTitleChange} />
			</Nav.section>
			*/}
			<Nav.section>
				{this.renderSaveButton()}
				<PrintNavItem opts={{dialog : true, local : KEY}} />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},




	renderContent : function(){
		if(this.state.showEditor){
			return <SplitPane ref='pane'>
				<Editor
					sheet={this.getSheet()}
					onChange={this.handleSheetUpdate}
				/>
				<Renderer
					sheet={this.getSheet()}
					onDataChange={this.handleDataChange}

					showEditorState={this.state.showEditor}
					onEditorShowChange={this.handleEditorShowChange}
				/>
			</SplitPane>
		}else{
			return <Renderer
				sheet={this.getSheet()}
				onDataChange={this.handleDataChange}

				showEditorState={this.state.showEditor}
				onEditorShowChange={this.handleEditorShowChange}
			/>
		}
	},


	render : function(){
		return <div className='page newPage'>
			{this.renderNavbar()}

			<div className='content'>
				{this.renderContent()}
			</div>
		</div>
	}
});

module.exports = NewPage;
