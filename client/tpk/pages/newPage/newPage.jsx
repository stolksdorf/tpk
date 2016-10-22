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


let KEY = 'NEW_PAGE';


//const Store = require('tpk/sheet.store.js');
const Actions = require('tpk/sheet.actions.js');


var NewPage = React.createClass({
	//mixins : [Store.mixin()],

	getInitialState: function() {
		return {
			sheet : {
				info : {
					title : '',
					desc : '',
					published : false
				},
				template : '',
				data : {},
				logic : ''
			},

			query : {},
			isSaving : false,
			errors : []
		};
	},
	componentDidMount: function(){
		if(this.props.query.local) KEY = this.props.query.local;
		Actions.loadFromLocal(KEY);
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
	},



	save : function(){
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
				localStorage.removeItem(KEY);
				window.location = `/edit/${sheet.editId}/${_.snakeCase(sheet.title)}`;
			})
	},



	renderSaveButton : function(){
		if(this.state.isSaving){
			return <Nav.item icon='fa-spinner fa-spin' className='saveButton'>
				save...
			</Nav.item>
		}else{
			return <Nav.item icon='fa-save' className='saveButton' onClick={this.save}>
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



	render : function(){
		return <div className='page newPage'>
			{this.renderNavbar()}

			<div className='content'>
				<SplitPane ref='pane'>
					<Editor />
					<Renderer />
				</SplitPane>
			</div>
		</div>
	}
});

module.exports = NewPage;
