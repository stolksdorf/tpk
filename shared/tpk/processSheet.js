var _ = require('lodash');
var jsx2json = require('tpk/jsx-parser');
var Parts = require('tpk/parts');
var get = require('tpk/parts/utils.js').get;
//var md5 = require('md5');


var last = {
	template : '',
	nodes : [],

	/*
	dataHash : '',
	logicHash : '',
	processedData : {}
	*/
};


const ProcessSheet = {

	getSheetStucture : function(template){
		if(template == last.template) return last.nodes;
		var nodes = jsx2json(template);
		last.template = template;
		last.nodes = nodes;
		return nodes;
	},

	runLogic : function(template, logic, data){


		//if(!_.isObject(data)) data = ProcessSheet.getDefaultData(template);
		if(!_.isObject(data)) data = {};
		if(!logic) return data;

		/*

		var dataHash = md5(JSON.stringify(data));
		var logicHash = md5(logic);

		if(dataHash == last.dataHash && logicHash == last.logicHash) return last.processedData;

		console.log('Doing new calc');

		*/

		try{
			var code = `(function(){
				'use strict';
				var data = ${JSON.stringify(data)};
				${logic};
				return data;
			})();`;
			var processedData = _.merge({}, data, eval(code));

			//last.logicHash = logicHash;
			//last.dataHash = dataHash;
			//last.processedData = processedData;

			return processedData;

		}catch(e){
			console.log('err', e.toString());

			//write a better error handler?
			//http://stackoverflow.com/questions/3526902/tracing-the-source-line-of-an-error-in-a-javascript-eval

			throw e;
		}
	},



	//TODO: Needs a lot of work
	getDefaultData : function(template){
		var getDefaultNodeData  = function(node){
			console.log(node.tag, !!Parts[node.tag]);

			console.log(Parts[node.tag].defaultProps.data, node.tag);

			//return {};

			var res = {};

			//TODO: Fix for falsey default values
			//var res = JSON.parse(JSON.stringify(Parts[node.tag].defaultProps.defaultData || {})) ;
			_.each(node.children, (child)=>{
				var childId = get.id(child.props);
				console.log(childId);
				res[childId] = getDefaultNodeData(child);

				//var name = Parts[child.tag].defaultProps.name
				//var id = _.snakeCase(child.props.id || child.props.title || child.props.label || name);
				//res[id] = getDefaultNodeData(child);
			})
			return res;
		};
		var sheets = jsx2json(template);

		return _.reduce(sheets, (r, sheet)=>{
			return _.merge(r, getDefaultNodeData(sheet));
		}, {});

	},


}

module.exports = ProcessSheet;