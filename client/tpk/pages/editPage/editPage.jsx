var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var SaveSheetNavItem = require('../../navbar/saveSheet.navitem.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var Renderer = require('../../renderer/renderer.jsx');
var Editor = require('../../editor/editor.jsx');

//const Store = require('tpk/sheet.store.js');
const Actions = require('tpk/sheet.actions.js');




var EditPage = React.createClass({
	//mixins : [Store.mixin()],
	getDefaultProps: function() {
		return {
			sheet : {
				editId : '',
				viewId : '',

				info : {
					title : '',
					desc : '',
					published : false
				},
				template : '',
				data : {},
				logic : '',
			},
		};
	},

	componentWillMount : function(){
		Actions.setSheet(this.props.sheet);
	},

	//Move to own nav item
	renderPublishNavItem : function(){
		if(this.props.sheet.info.published) return;

		return <Nav.item
			color='purple' icon='fa-rocket'
			onClick={Actions.publish}>
			Publish
		</Nav.item>
	},

	renderNavbar : function(){
		return <Navbar>
			<Nav.section>
				<Nav.item>{this.props.sheet.info.title}</Nav.item>
			</Nav.section>
			<Nav.section>
				<SaveSheetNavItem editId={this.props.sheet.editId} />
				<Nav.item
					newTab={true} color='teal' icon='fa-share-alt'
					href={`/sheet/${this.props.sheet.viewId}/${_.snakeCase(this.props.sheet.info.title)}`}>
					Share
				</Nav.item>
				{this.renderPublishNavItem()}
				<PrintNavItem href={this.props.sheet.viewId} />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},



	render : function(){
		return <div className='page editPage'>
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

module.exports = EditPage;





