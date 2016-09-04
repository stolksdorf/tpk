//DEPRICATE

var dispatch = require('pico-flux').dispatch;

var Store = require('./store.js');

module.exports = {

	init : function(){
		dispatch('INIT');
	},

	loadFromLocalStorage : function(id){
		dispatch('LOAD_LOCAL', id);
	},

	storeToLocal : function(id){
		localStorage.setItem(`${id}|TEMPLATE`, Store.getTemplate());
		localStorage.setItem(`${id}|LOGIC`, Store.getLogic());
		localStorage.setItem(`${id}|DATA`, JSON.stringify(Store.getCharacterData()));
	},

	cleanUpData : function(){
		dispatch('CLEAN_UP');
	},

	clearCharacterData : function(){
		dispatch('CLEAR_CHARACTER_DATA');
	},


	changeTemplate : function(template){
		dispatch('CHANGE_TEMPLATE', template);
	},
	changeLogic : function(logic){
		dispatch('CHANGE_LOGIC', logic);
	},
	changeCharacterData : function(data){
		dispatch('CHANGE_CHARACTER', data);
	},


	setDefaults : function(defaults){
		dispatch('SET_DEFAULTS', defaults);
	}

}