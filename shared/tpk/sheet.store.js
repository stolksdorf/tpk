const flux = require('pico-flux');
const _ = require('lodash');
const ProcessSheet = require('tpk/processSheet.js');


const EmptySheet = {
	info : {
		published : false,
		title : '',
		desc : ''
	},
	template : '<Sheet>\n\n\n</Sheet>',
	data : {},
	logic : ''
}


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

let LocalKey = false;
const saveSheetToLocal = (_key)=>{
	let key = _key || LocalKey;
	if(!key) return;
	console.log('saving to local', key);
	localStorage.setItem(key, JSON.stringify(State.sheet));
};

const SheetStore = flux.createStore({

	SET_SHEET : function(sheet){
		State.sheet = _.assign(EmptySheet, sheet);
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
		LocalKey = key || LocalKey;
		try{
			State.sheet = _.assign(EmptySheet, JSON.parse(localStorage.getItem(LocalKey)));
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
	getInfo : function(){
		return State.sheet.info;
	},


	isPublished : function(){
		return !!State.sheet.info.published;
	},

	getSheetHash : function(){
		return JSON.stringify(State.sheet);
	},

});

module.exports = SheetStore;