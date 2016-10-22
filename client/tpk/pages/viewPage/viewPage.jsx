var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');


var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');
var CloneNavItem = require('../../navbar/clone.navitem.jsx');
var SaveDataNavItem = require('../../navbar/saveData.navitem.jsx');

const Actions = require('tpk/sheet.actions.js');
const Renderer = require('../../renderer/renderer.jsx');

const KEY = 'change this';

var ViewPage = React.createClass({
	getDefaultProps: function() {
		return {
			overrideId : '',
			overrideData : null,

			sheet : {},
		};
	},

	componentWillMount : function(){
		Actions.setSheet(_.assign(this.props.sheet, {
			data : this.props.overrideData || this.props.sheet.data
		}));
	},

	//TODO look into this
	getPrintHref : function(){
		let query = `data=${this.props.overrideId}`;
		if(!this.props.overrideId) query = `local=${KEY}`;
		return `${this.props.sheet.viewId}?${query}`
	},

	handleCreate : function(overrideData){
		window.location = `/sheet/${this.props.sheet.viewId}?data=${overrideData.id}`;
	},

	renderNavbar : function(){
		return <Navbar>
			<Nav.section>
				<Nav.item>{this.props.sheet.info.title}</Nav.item>
			</Nav.section>
			<Nav.section>
				<SaveDataNavItem
					overrideId={this.props.overrideId}
					sheetId={this.props.sheet.shareId}
					onCreate={this.handleCreate} />
				<PrintNavItem href={this.getPrintHref()} />
				<CloneNavItem />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},

	render : function(){
		return <div className='page viewPage'>
			{this.renderNavbar()}
			<div className='content'>
				<Renderer />
			</div>
		</div>
	}
});

module.exports = ViewPage;
