var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');


var HomePage = React.createClass({
	getDefaultProps: function() {
		return {
			templates : [],
			publishedSheets : []
		};
	},


	renderSheetCard : function(sheet, route=''){
		//const href =
		return <a href={`/${route}/${sheet.viewId}`} className='sheetCard' key={sheet.viewId}>
			<h5>{sheet.info.title}</h5>
			<p>{sheet.info.desc}</p>

		</a>
	},


	renderPublishedSection : function(){
		const sheets = _.map(this.props.publishedSheets, (temp) => {
			return this.renderSheetCard(temp, 'sheet');
		});

		return <section className='published'>
			<h2>Published Sheets</h2>
			{sheets}
		</section>
	},

	renderTemplateSection : function(){
		const templates = _.map(this.props.templates, (temp) => {
			return this.renderSheetCard(temp, 'template');
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

			</div>
		</div>
	}
});

module.exports = HomePage;
