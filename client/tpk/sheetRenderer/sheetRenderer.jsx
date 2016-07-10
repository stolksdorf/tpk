var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var jsx2json = require('tpk/jsx-parser');
var Parts = require('tpk/parts');

var Store = require('tpk/store.js');
var Actions = require('tpk/actions.js');


var SheetRenderer = React.createClass({
	mixins : [Store.mixin()],
	getInitialState: function() {
		return {
			template : Store.getTemplate(),
			logic : Store.getLogic(),
			characterData : Store.getProcessedData(),


			height: 0,
			errors : null
		};
	},

	onStoreChange : function(){
		this.setState({
			template : Store.getTemplate(),
			logic : Store.getLogic(),
			characterData : Store.getProcessedData(),
		})
	},

	lastSheet : <div />,
	errors : null,

	componentDidMount: function() {
		this.setState({
			height : this.refs.main.parentNode.clientHeight,
		});
	},

	handleCharacterDataChange : function(charData){
		Actions.changeCharacterData(charData);
	},


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
			var nodes = jsx2json(this.state.template);

			nodes = _.map(nodes, (node)=>{
				node.props.data = this.state.characterData;
				node.props.onChange = (newData)=>{
					this.handleCharacterDataChange(_.extend(this.state.characterData, newData));
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
