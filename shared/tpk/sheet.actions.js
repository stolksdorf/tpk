const _ = require('lodash');
const dispatch = require('pico-flux').dispatch;

const Store = require('./sheet.store.js');
const ProcessSheet = require('tpk/processSheet.js');

const Actions = {
	setSheet : function(sheet){
		dispatch('SET_SHEET', sheet);
	},

	updateSheet : function(sheet){
		dispatch('UPDATE_SHEET', sheet);
	},


	publish : function(){
		if(!confirm('Ready to share your sheet with the world?')) return;

		Actions.updateSheet({
			//info
		});
	},

	unpublish : function(){

	},

	//Maybe?
	updateTemplate : function(template){
		if(Store.getTemplate() == template) return;
		Actions.updateSheet({
			template : template
		});
	},

	clone : function(){
		let clonedData = _.assign({}, Store.getSheet());

		clonedData.info.published = false;
		clonedData.info.title += ' (cloned)';

		localStorage.setItem('CLONE', JSON.stringify(clonedData));
		window.open(`/new?local=CLONE`, '_blank').focus();

	},

	resetData : function(){
		Actions.updateSheet({
			data : ProcessSheet.getDefaultData(Store.getTemplate())
		});
	},



};

module.exports = Actions;