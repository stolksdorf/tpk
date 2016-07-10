var React = require('react');
var _ = require('lodash');

var Nav = require('naturalcrit/nav/nav.jsx');
var Actions = require('tpk/actions.js');

var Navbar = React.createClass({
	render : function(){
		return <Nav.base>
			<Nav.section>
				<Nav.logo />
				<Nav.item href='/tpk' className='tpkLogo'>
					<div>Total Player Knolling</div>
				</Nav.item>
				<Nav.item>v0.0.0 - super duper alpha</Nav.item>


				<Nav.item onClick={Actions.clearCharacterData}>
					Clear Character Data
				</Nav.item>


			</Nav.section>
			{this.props.children}
		</Nav.base>
	}
});

module.exports = Navbar;
