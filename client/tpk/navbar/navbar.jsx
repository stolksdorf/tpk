var React = require('react');
var _ = require('lodash');

var Nav = require('naturalcrit/nav/nav.jsx');

var Navbar = React.createClass({
	getDefaultProps: function() {
		return {
			ver : '0.0.0 - Update this'
		};
	},
	render : function(){
		return <Nav.base>
			<Nav.section>
				<Nav.logo />
				<Nav.item href='/tpk' className='tpkLogo'>
					<div>Total Player Knolling</div>
				</Nav.item>
				<Nav.item>{`v${this.props.ver}`}</Nav.item>
			</Nav.section>
			{this.props.children}
		</Nav.base>
	}
});

module.exports = Navbar;
