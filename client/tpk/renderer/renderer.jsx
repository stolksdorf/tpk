var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var RenderSheet = require('tpk/renderSheet.js');
var Actions = require('tpk/sheet.actions.js');
const Store = require('tpk/sheet.store.js');

var Renderer = React.createClass({
	mixins : [Store.mixin()],
	getDefaultProps: function() {
		return {
			sheet : {
				template : '',
				data : {},
				logic : ''
			},
			//onChange : ()=>{},
			//onEditorShowChange : ()=>{}
		};
	},
	getInitialState: function() {
		return {
			height: 0,

			template : Store.getSheet().template,
			data : Store.getSheet().data,
		};
	},
	onStoreChange : function(){
		this.setState({
			template : Store.getSheet().template,
			data : Store.getSheet().data,
		})
	},

	componentDidMount: function() {
		this.setState({
			height : this.refs.renderer.parentNode.clientHeight,
		});
	},

	lastSheet : <div />,
	errors : null,


	handleChange : function(newData){
		Actions.updateSheet({
			data : newData
		});
	},

	renderErrors : function(){
		if(!this.errors) return;
		return <div className='errors'>{this.errors.toString()}</div>
	},

	render : function(){
		this.errors = null;

		var sheet;
		try{
			sheet = RenderSheet(this.state.template, this.state.data, this.handleChange);
			this.lastSheet = sheet;
		}catch(e){
			this.errors = e;
			sheet = this.lastSheet;
		}

		return <div className='renderer' ref='renderer' style={{height:this.state.height}}>
			{/*this.renderEditorButton()*/}
			<div className='sheets'>{sheet}</div>
			{this.renderErrors()}
		</div>
	}
});


module.exports = Renderer;
