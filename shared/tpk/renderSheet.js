var React = require('react');
var _     = require('lodash');
var Parts = require('./parts');
var ProcessSheet = require('./processSheet.js');

module.exports = function(template, data, onChange = ()=>{}){
	var renderChildren = (nodes) => {
		return _.map(nodes, (node, index)=>{
			if(_.isString(node)) return node;
			return renderElement(node, index);
		})
	};
	var renderElement = (node, key)=>{
		if(!node.tag) return null;
		if(!Parts[node.tag]) throw 'Could Not Find Element: ' + node.tag;
		return React.createElement(
			Parts[node.tag],
			{key : key, ...node.props},
			...renderChildren(node.children))
	};

	var sheetStructure = ProcessSheet.getSheetStucture(template);
	//var processedData = ProcessSheet.runLogic(sheet.logic,sheet.data);

	//Add data and handlers to structure
	sheetStructure = _.map(sheetStructure, (node)=>{
		node.props.data = data;
		node.props.onChange = (newData)=>{
			onChange(_.assign({}, data, newData));
		}
		return node;
	})
	return renderChildren(sheetStructure);
}
