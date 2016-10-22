const flux = require('pico-flux');
const _ = require('lodash');
const ProcessSheet = require('tpk/processSheet.js');


let LocalKey = '';
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


const saveSheetToLocal = (_key)=>{
	let key = _key || LocalKey;
	if(!key) return;
	localStorage.setItem(key, JSON,stringify(State.sheet));

};

const SheetStore = flux.createStore({

	SET_SHEET : function(sheet){
		State.sheet = sheet;

		saveSheetToLocal();
	},
	UPDATE_SHEET : function(sheet){
		State.sheet = _.assign({}, State.sheet, sheet);
		State.sheet.data = ProcessSheet.runLogic(State.sheet.template, State.sheet.logic, State.sheet.data);

		saveSheetToLocal();
	},


	SET_LOCAL_KEY : function(key){
		LocalKey = key;
	},
	LOAD_FROM_LOCAL : function(key){
		LocalKey = key;
		try{
			State.sheet = JSON.parse(localStorage.getItem(LocalKey));
		}catch(e){
			console.error('load err', e);
		}
	},

},{
	getSheet : function(){
		return State.sheet
	},
	getTemplate : function(){
		return State.sheet.template;
	},
	getData : function(){
		return State.sheet.data;
	},

	isPublished : function(){
		return !!State.sheet.info.published;
	}


});

module.exports = SheetStore;