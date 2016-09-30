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
			override : {},

			sheet : {
				//editId : '',
				shareId : '',

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

	render : function(){
		return <div className='viewPage'>
			ViewPage Component Ready.
		</div>
	}
});

module.exports = ViewPage;
