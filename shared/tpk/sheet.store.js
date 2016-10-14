const flux = require('pico-flux');
const _ = require('lodash');
const ProcessSheet = require('tpk/processSheet.js');



const State = {
	sheet : {
		editId : null,
		viewId : null,

		info : {
			published : false,
			title : '',
			desc : ''
		},
		template : '',
		data : {},
		logic : ''
	},

	errors : {
		render : [],
		logic : [],
		template : []
	}
}



const SheetStore = flux.createStore({

	SET_SHEET : function(sheet){
		State.sheet = sheet;
	},

	UPDATE_SHEET : function(sheet){
		State.sheet = _.assign({}, State.sheet, sheet);
		State.sheet.data = ProcessSheet.runLogic(State.sheet.template, State.sheet.logic, State.sheet.data);
	},



},{
	getSheet : function(){
		return State.sheet
	},
	getTemplate : function(){
		return State.sheet.template;
	},

	isPublished : function(){
		return !!State.sheet.info.published;
	}


});

module.exports = SheetStore;