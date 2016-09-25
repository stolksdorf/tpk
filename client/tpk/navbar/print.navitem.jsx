var React = require('react');
var _ = require('lodash');
var Nav = require('naturalcrit/nav/nav.jsx');

module.exports = function(props){
	var opts = _.map(props.opts, (val, name)=>{
		return `${name}=${val}`;
	}).join('&');

	var id = '';
	if(props.id) id = '/' + props.id;

	return <Nav.item
		newTab={true}
		href={`/print${id}?${opts}`}
		color='purple'
		icon='fa-file-pdf-o'>
		get PDF
	</Nav.item>
};