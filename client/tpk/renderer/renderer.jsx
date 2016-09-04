var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var jsx2json = require('tpk/jsx-parser');
var Parts = require('tpk/parts');


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
	errors : null,

	componentDidMount: function() {
		this.setState({
			height : this.refs.renderer.parentNode.clientHeight,
		});
	},

	handleCharacterDataChange : function(charData){
		console.log('charData', charData);

		this.props.onChange(_.assign({}, this.props.sheet, {
			data : charData
		}));

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
		//console.log('rendering sheet');
		try{
			var nodes = jsx2json(this.props.sheet.template);
			//console.log(nodes);

			nodes = _.map(nodes, (node)=>{
				node.props.data = this.props.sheet.data;
				node.props.onChange = (newData)=>{
					this.handleCharacterDataChange(newData);
				}
				return node;
			})
			sheet = this.renderChildren(nodes);
			this.lastSheet = sheet;

			return sheet;
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
