var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');
var CreateSheetNavItem = require('../../navbar/createSheet.navitem.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var Renderer = require('../../renderer/renderer.jsx');
var Editor = require('../../editor/editor.jsx');

const Store = require('tpk/sheet.store.js');
const Actions = require('tpk/sheet.actions.js');


let KEY = 'NEW_PAGE';

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

			query : {},
			isSaving : false,
			errors : []
		};
	},
	componentDidMount: function(){
		if(this.props.query.local) KEY = this.props.query.local;
		Actions.setLocalKey(KEY);
		Actions.loadFromLocal();
	},
	handleCreate : function(newSheet){
		localStorage.removeItem(KEY);
		window.location = `/edit/${newSheet.editId}/${_.snakeCase(newSheet.title)}`;
	},
	renderNavbar : function(){
		return <Navbar ver={this.props.ver}>
			<Nav.section>
				<CreateSheetNavItem onCreate={this.handleCreate} />
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
