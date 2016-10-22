const _ = require('lodash');
const dispatch = require('pico-flux').dispatch;

const Store = require('./sheet.store.js');
const ProcessSheet = require('tpk/processSheet.js');
const AsyncActions = require('./async.actions.js');

const Actions = {
	//Overwrites existing sheet info
	setSheet : function(sheet){
		dispatch('SET_SHEET', sheet);
	},

	//Merges with existing sheet info
	updateSheet : function(sheet){
		dispatch('UPDATE_SHEET', sheet);
	},


	publish : function(){
		if(!confirm('Ready to share your sheet with the world?')) return;

		Actions.updateSheet({
			info : {
				...Store.getInfo(),
				published : true
			}
		});
	},

	unpublish : function(){

	},


	cloneSheet : function(){
		let clonedData = _.cloneDeep(Store.getSheet());

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

	setLocalKey : function(key){
		dispatch('SET_LOCAL_KEY', key);
	},
	saveToLocal : function(key){
		localStorage.setItem(key, JSON.stringify(Store.getSheet()));
	},
	loadFromLocal : function(key){
		dispatch('LOAD_FROM_LOCAL', key);
	},
};


module.exports = _.assign(Actions, { async : AsyncActions });