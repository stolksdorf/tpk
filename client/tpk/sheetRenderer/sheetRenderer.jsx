var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var jsx2json = require('naturalcrit/jsx-parser');

var Parts = require('./parts');


var SheetRenderer = React.createClass({
	getDefaultProps: function() {
		return {
			code : '',
			characterData : {},
			onChange : function(){},
		};
	},

	getInitialState: function() {
		return {
			height: 0,

			errors : null
		};
	},

	lastSheet : <div />,
	errors : null,

	componentDidMount: function() {
		this.setState({
			height : this.refs.main.parentNode.clientHeight,
		});
	},

	////////////
	getDefaultSheetData  : function(sheets){
		return _.map(sheets, (sheet)=>{
			return this.getDefaultNodeData(sheet);
		});
	},

	getDefaultNodeData  : function(node){
		var res = JSON.parse(JSON.stringify(Parts[node.tag].defaultProps.defaultData || {})) ;
		_.each(node.children, (child)=>{
			var name = Parts[child.tag].defaultProps.name
			var id = child.props.id || child.props.title || child.props.label || name;
			res[id] = this.getDefaultNodeData(child);
		})
		return res;
	},
	//////////////////



	renderElement : function(node, key){
		if(!node.tag) return null;

		if(!Parts[node.tag]) throw 'Could Not Find Element: ' + node.tag;


		return React.createElement(
			Parts[node.tag],
			{key : key, ...node.props},
			...this.renderChildren(node.children))
	},
	renderChildren : function(nodes){
		return _.map(nodes, (node, index)=>{
			if(_.isString(node)) return node;
			return this.renderElement(node, index);
		})
	},
	renderSheet : function(){
		this.errors = null;
		var sheet;
		try{
			var nodes = jsx2json(this.props.code);

			console.log(this.getDefaultSheetData(nodes));

			//get default data architecture
			//compare to current character data and clean up


			nodes = _.map(nodes, (node)=>{
				node.props.data = this.props.characterData;
				node.props.onChange = (newData)=>{
					this.props.onChange(_.extend(this.props.characterData, newData));
				}
				return node
			})
			sheet = this.renderChildren(nodes);
			this.lastSheet = sheet;

			return sheet;
		}catch(e){
			this.errors = e;
			return this.lastSheet
		}
	},

	renderErrors : function(){
		if(!this.errors) return;
		return <div className='errors'>{this.errors.toString()}</div>
	},

	render : function(){
		return <div className='sheetRenderer' ref='main' style={{height:this.state.height}}>
			<div className='sheetContainer' ref='sheetContainer'>
				{this.renderSheet()}
			</div>
			{this.renderErrors()}
		</div>
	}
});


module.exports = SheetRenderer;
