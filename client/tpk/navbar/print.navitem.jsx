var React = require('react');
var Nav = require('naturalcrit/nav/nav.jsx');

module.exports = function(props){
	return <Nav.item newTab={true} href={'/print/' + props.id +'?dialog=true'} color='purple' icon='fa-file-pdf-o'>
		get PDF
	</Nav.item>
};