var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Parts = require('tpk/parts');
var ProcessSheet = require('tpk/processSheet.js');

var Renderer = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				template : '',
				data : {},
				logic : ''
			},
			onChange : ()=>{}
		};
	},
	getInitialState: function() {
		return {
			height: 0,
			errors : null
		};
	},

	//TODO : Split this off into another file
	lastSheet : <div />,


	//Errors should be handled above
	errors : null,

	componentDidMount: function() {
		this.setState({
			height : this.refs.renderer.parentNode.clientHeight,
		});
	},

	handleCharacterDataChange : function(charData){
		console.log('charData', charData);

		this.props.onChange(_.assign({}, this.props.sheet, {
			data : _.assign({}, this.props.sheet.data, charData)
		}));

	},

	renderSheet : function(){
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

		this.errors = null;
		try{
			var sheetStructure = ProcessSheet.getSheetStucture(this.props.sheet.template);
			var processedData = ProcessSheet.runLogic(this.props.sheet.logic,this.props.sheet.data);

			//Add data and handlers to structure
			sheetStructure = _.map(sheetStructure, (node)=>{
				node.props.data = processedData;
				node.props.onChange = (newData)=>{
					this.handleCharacterDataChange(newData);
				}
				return node;
			})
			var renderedSheet = renderChildren(sheetStructure);
			this.lastSheet = renderedSheet;

			return renderedSheet;
		}catch(e){
			this.errors = e;
			return this.lastSheet;
		}
	},

	renderErrors : function(){
		if(!this.errors) return;
		return <div className='errors'>{this.errors.toString()}</div>
	},

	render : function(){

		return <div className='renderer' ref='renderer' style={{height:this.state.height}}>
			<div className='sheetContainer' ref='sheetContainer'>
				{this.renderSheet()}
			</div>
			{this.renderErrors()}
		</div>
	}
});


module.exports = Renderer;
