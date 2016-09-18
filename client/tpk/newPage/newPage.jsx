var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../navbar/navbar.jsx');
var EditTitle = require('../navbar/editTitle.navitem.jsx');
var IssueNavItem = require('../navbar/issue.navitem.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var Renderer = require('../renderer/renderer.jsx');
var Editor = require('../editor/editor.jsx');


const KEY = 'SHEET';


var NewPage = React.createClass({
	getDefaultProps: function() {
		return {
			ver : '0.0.0'
		};
	},

	getInitialState: function() {
		return {
			sheet : {
				title : '',
				template : '',
				data : {},
				logic : ''
			},

			isSaving : false,
			errors : []
		};
	},

	componentDidMount: function() {
		try{
			var sheet = localStorage.getItem(KEY);
			this.setState({
				sheet : _.assign({}, this.state.sheet, JSON.parse(sheet))
			});
		}catch(e){

		}
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
	},

	handleSheetUpdate : function(newSheet){
		this.setState({
			sheet : newSheet
		})
		localStorage.setItem(KEY, JSON.stringify(newSheet));
	},

	handleTitleChange : function(title){
		this.setState({
			sheet : _.assign({}, this.state.sheet, {title : title})
		});
	},


	handleSave : function(){
		this.setState({
			isSaving : true,
			errors : null
		});

		request.post('/api/sheet')
			.send(this.state.sheet)
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
			<Nav.section>
				<EditTitle title={this.state.sheet.title} onChange={this.handleTitleChange} />
			</Nav.section>

			<Nav.section>
				{this.renderSaveButton()}
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},



	render : function(){
		return <div className='page newPage'>
			{this.renderNavbar()}

			<div className='content'>
				<SplitPane ref='pane'>
					<Editor
						sheet={this.state.sheet}
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

module.exports = NewPage;
