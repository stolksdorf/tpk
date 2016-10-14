const flux = require('pico-flux');
const _ = require('lodash');
const ProcessSheet = require('tpk/processSheet.js');



let Sheet = {
	info : {
		published : false,
	},
	template : '',
	data : {},
	logic : ''
};

let Override = {
	id : null,
	data : {}
}

const SheetStore = flux.createStore({

	SET_SHEET : function(sheet){
		Sheet = _.assign({}, sheet);
	},
	SET_OVERRIDE : function(override){
		Override = _.assign({}, override);
	},

	UPDATE_SHEET : function(sheet){
		console.log('updating sheet');
		Sheet = _.assign({}, Sheet, sheet);
		Sheet.data = ProcessSheet.runLogic(Sheet.template, Sheet.logic, Sheet.data);

		console.log('data', Sheet.data);
	},
	UPDATE_OVERRIDE : function(data){
		Override.data = ProcessSheet.runLogic(Sheet.template, Sheet.logic, data);
	},


},{
	getSheet : function(){
		return {
			info : Sheet.info,
			template : Sheet.template,
			logic : Sheet.logic,
			data : (Override.id ? Override.data : Sheet.data)
		}
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