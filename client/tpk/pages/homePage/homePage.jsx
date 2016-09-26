var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');


var HomePage = React.createClass({

	render : function(){
		return <div className='page homePage'>
			<Navbar>
				<Nav.section>
					<Nav.item>
						yo dawg
					</Nav.item>
				</Nav.section>
			</Navbar>


			<div className='content'>
				Hey!

			</div>
		</div>
	}
});

module.exports = HomePage;
