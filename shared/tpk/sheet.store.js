const flux = require('pico-flux');
const _ = require('lodash');
const ProcessSheet = require('tpk/processSheet.js');



let Sheet = {
	info : {
		published : false,
		title : '',
		desc : ''
	},
	template : '',
	data : {},
	logic : ''
};


const SheetStore = flux.createStore({

	SET_SHEET : function(sheet){
		Sheet = {
			info : sheet.info,
			template : sheet.template,
			logic : sheet.logic,
			data : sheet.data,
		}
	},

	UPDATE_SHEET : function(sheet){
		console.log('updating sheet');
		Sheet = _.assign({}, Sheet, sheet);
		Sheet.data = ProcessSheet.runLogic(Sheet.template, Sheet.logic, Sheet.data);

		console.log('data', Sheet.data);
	},



},{
	getSheet : function(){
		return Sheet
	},
	getOverrideData : function(){
		return Override.data
	},


	getTemplate : function(){
		return Sheet.template;
	},



	isPublished : function(){
		return !!Sheet.info.published;
	}


});

module.exports = SheetStore;