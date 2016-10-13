var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');


var HomePage = React.createClass({
	getDefaultProps: function() {
		return {
			templates : [],
			published : []
		};
	},


	renderSheetCard : function(sheet, route=''){
		//const href =
		return <a target='_blank' href={`/${route}/${sheet.viewId}`} className='sheetCard' key={sheet.viewId}>
			<h5>{sheet.info.title}</h5>
			<p>{sheet.info.desc}</p>

		</a>
	},


	renderPublishedSection : function(){
		const sheets = _.map(this.props.published, (sheet) => {
			return this.renderSheetCard(sheet, 'sheet');
		});

		return <section className='published'>
			<h2>Published Sheets</h2>
			{sheets}
		</section>
	},

	renderTemplateSection : function(){
		const templates = _.map(this.props.templates, (sheet) => {
			return this.renderSheetCard(sheet, 'template');
		});

		return <section className='templates'>
			<h2>Templates</h2>
			{templates}
		</section>
	},
	renderNavbar : function(){
		return <Navbar>
			<Nav.section>

			</Nav.section>
		</Navbar>
	},

	render : function(){
		return <div className='page homePage'>
			{this.renderNavbar()}

			<div className='content'>
				{this.renderTemplateSection()}
				{this.renderPublishedSection()}

			</div>
		</div>
	}
});

module.exports = HomePage;
