var React = require('react');
var _ = require('lodash');

var Nav = require('naturalcrit/nav/nav.jsx');

var Navbar = React.createClass({
	render : function(){
		return <Nav.base>
			<Nav.section>
				<Nav.logo />
				<Nav.item href='/tpk' className='tpkLogo'>
					<div>Total Player Knolling</div>
				</Nav.item>
				<Nav.item>v0.0.0 - super duper alpha</Nav.item>
			</Nav.section>
			{this.props.children}
		</Nav.base>
	}
});

module.exports = Navbar;
