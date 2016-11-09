var _ = require('lodash');
var jsx2json = require('tpk/jsx-parser');
var Parts = require('tpk/parts');
var get = require('tpk/parts/utils.js').get;
//var md5 = require('md5');

var tpkLib = _.reduce(require('tpk/tpk.lib.js'), (r, func, key) => {
	return `${r}${key}:${func.toString()},`;
}, '{') + '}';






var last = {
	template : '',
	nodes : [],

	data : {},
	logic : '',
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

		console.log('running', logic == last.logic, data == last.data);
		if(logic == last.logic && data == last.data){
			console.log('efficiency!');
			return last.data;
		}

		try{
			var code = `(function(){
				'use strict';
				var data = ${JSON.stringify(data)};
				var tpk = ${tpkLib}
				${logic};
				return data;
			})();`;
			var processedData = _.merge({}, data, eval(code));

			last.logic = logic;
			last.data = processedData;

			return processedData;

		}catch(e){
			console.log('err', e.toString());

			//write a better error handler?
			//http://stackoverflow.com/questions/3526902/tracing-the-source-line-of-an-error-in-a-javascript-eval

			throw e;
		}
	},


	getDefaultData : function(template){
		const getDefaultNodeData  = function(node){
			if(!node.children.length) return Parts[node.tag].defaultProps.data;

			return _.reduce(node.children, (r, child, idx)=>{
				const childId = get.id(_.merge({}, child.props, Parts[child.tag].defaultProps), idx);
				if(!childId) return _.merge(r, getDefaultNodeData(child));
				r[childId] = getDefaultNodeData(child);
				return r;
			}, {})
		};
		const sheets = jsx2json(template);
		return _.reduce(sheets, (r, sheet)=>{
			return _.merge(r, getDefaultNodeData(sheet));
		}, {});
	},

	getNodeMapObject : function(template){


	},


}

module.exports = ProcessSheet;