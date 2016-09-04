//DEPRICATE!@!!!!!!!


var flux = require('pico-flux');
var _ = require('lodash');
var Parts = require('tpk/parts');
var jsx2json = require('tpk/jsx-parser');

var State = {

	sheet : {
		logic : '',
		template : '',
		info : {

		}
	},

	character : {
		data : {

		},

		processedData : {}
	},

	errors : {
		logic : null
	}


};

var processCharacterData = function(){
	State.errors.logic = null;

	if(!State.sheet.logic){
		State.character.processedData = _.cloneDeep(State.character.data);
		return;
	}

	try{
		var code = `(function(){'use strict';var data = ${JSON.stringify(State.character.data)}; ${State.sheet.logic};return data;})();`;
		State.character.processedData = eval(code);
	}catch(e){
		console.log('err', e.toString());

		//write a better error handler?
		//http://stackoverflow.com/questions/3526902/tracing-the-source-line-of-an-error-in-a-javascript-eval

		State.character.processedData = _.cloneDeep(State.character.data);
		State.errors.logic = e;
	}
};

//Possibly move this and sheet processing to it's own file
var getDefaultSheetData = function(){
	var getDefaultNodeData  = function(node){
		//TODO: Fix for falsey default values
		var res = JSON.parse(JSON.stringify(Parts[node.tag].defaultProps.defaultData || {})) ;
		_.each(node.children, (child)=>{
			var name = Parts[child.tag].defaultProps.name
			var id = _.snakeCase(child.props.id || child.props.title || child.props.label || name);
			res[id] = getDefaultNodeData(child);
		})
		return res;
	};
	var sheets = jsx2json(State.sheet.template);

	return _.reduce(sheets, (r, sheet)=>{
		return _.merge(r, getDefaultNodeData(sheet));
	}, {});
};









const TPKStore = flux.createStore({

	INIT : function(){

	},

	LOAD_LOCAL : function(id){
		State.sheet.template = localStorage.getItem(`${id}|TEMPLATE`) || '';
		State.sheet.logic    = localStorage.getItem(`${id}|LOGIC`) || '';
		State.character.data = JSON.parse(localStorage.getItem(`${id}|DATA`) || '{}');

		//State.character.data = _.merge(getDefaultSheetData(), State.character.data);

		processCharacterData();
	},

	CHANGE_TEMPLATE : function(newTemplate){
		State.sheet.template = newTemplate;
	},
	CHANGE_LOGIC : function(newLogic){
		State.sheet.logic = newLogic;
		processCharacterData();
	},
	CHANGE_CHARACTER : function(newCharacterData){
		State.character.data = newCharacterData;
		processCharacterData();
	},

	CLEAR_CHARACTER_DATA : function(){
		State.character.data = getDefaultSheetData();
		processCharacterData();
	},

	//Removes extra fields from the character
	CLEAN_UP : function(){
		//get default sheet data
	},

	SET_DEFAULTS : function(defaults){
		if(!State.sheet.template){
			State.sheet.template = defaults.template
		}

	}



},{
	getState : function(){
		return State;
	},

	getLogic : function(){
		return State.sheet.logic;
	},
	getTemplate : function(){
		return State.sheet.template;
	},
	getData : function(){
		return State.character.data;
	},
	getCharacterData : function(asString = false){
		if(asString) return JSON.stringify(State.character.data, null, '  ');
		return State.character.data;
	},
	getProcessedData : function(){
		return State.character.processedData;
	}


});

module.exports = TPKStore;