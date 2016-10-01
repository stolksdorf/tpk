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

var updateSheet = (sheet, field, newVal) => {
	if(_.isEqual(sheet[field], newVal)) return sheet;

	return _.assign(sheet, {
		[field] : _.assign(sheet[field], newVal)
	});
}


var NewPage = React.createClass({

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

			/*

			info : {
				title : '',
				desc : '',
				published : false
			},
			template : '',
			data : {},
			logic : '',
			*/


			query : {},
			isSaving : false,
			errors : []
		};
	},

	componentDidMount: function(){
		let key = KEY;
		if(this.props.query.local) key = this.props.query.local
		try{
			var sheet = localStorage.getItem(key);
			this.setState({
				sheet : JSON.parse(sheet)
			});
		}catch(e){}
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
	},

	/*
	getSheet : function(){
		return {
			info : this.state.info,
			template : this.state.template,
			data : this.state.data,
			logic : this.state.logic
		}
	},
	*/

	saveSheetToLocal : function(){
		localStorage.setItem(KEY, JSON.stringify(this.state.sheet));
	},


	handleSheetUpdate : function(newSheet){
		this.setState({
			sheet : newSheet
		}, this.saveSheetToLocal);
	},

	handleDataChange : function(newData){
		this.setState({
			sheet : updateSheet(this.state.sheet, 'data', newData)
		}, this.saveSheetToLocal);
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
						onChange={this.handleDataChange}
					/>
				</SplitPane>
			</div>
		</div>
	}
});

module.exports = NewPage;
