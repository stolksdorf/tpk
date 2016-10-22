var React = require('react');
var _ = require('lodash');
var Nav = require('naturalcrit/nav/nav.jsx');


const CLONE_KEY = 'CLONE';

const Actions = require('tpk/sheet.actions.js');

module.exports = function(props){

	/*
	const onClone = ()=>{
		localStorage.setItem(CLONE_KEY, JSON.stringify({
			info : props.sheet.info,
			data : props.sheet.data,
			template : props.sheet.template,
			logic : props.sheet.logic,
		}));
		window.open(`/new?local=${CLONE_KEY}`, '_blank').focus();
	};
	*/

	return <Nav.item color='green' icon='fa-clone' onClick={Actions.cloneSheet}>
		clone
	</Nav.item>
};