var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');


var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');



var Renderer = require('../../renderer/renderer.jsx');



var ViewPage = React.createClass({
	getDefaultProps: function() {
		return {
			overrideId : '',
			overrideData : {},

			sheet : {
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

	getInitialState: function() {
		return {
			overrideData : this.props.overrideData,

			isSaving : false,
			errors : null
		};
	},

	handleSheetUpdate : function(newData){
		console.log(newData);
	},



	renderNavbar : function(){
		return <Navbar>
			<Nav.section>
				<PrintNavItem id={this.props.sheet.viewId} />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},


	render : function(){
		console.log(this.props.sheet);


		return <div className='page viewPage'>
			{this.renderNavbar()}

			<div className='content'>
				<Renderer
					sheet={this.props.sheet}
					onChange={this.handleSheetUpdate}
				/>
			</div>
		</div>
	}
});

module.exports = ViewPage;
