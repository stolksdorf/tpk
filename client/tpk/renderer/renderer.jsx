var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var RenderSheet = require('tpk/renderSheet.js');

var Renderer = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				template : '',
				data : {},
				logic : ''
			},
			onDataChange : ()=>{},

			showEditorState2 : null,
			onEditorShowChange : ()=>{}
		};
	},
	getInitialState: function() {
		return {
			height: 0,
		};
	},
	componentDidMount: function() {
		this.setState({
			height : this.refs.renderer.parentNode.clientHeight,
		});
	},

	lastSheet : <div />,
	errors : null,


	handleChange : function(newData){
		this.props.onDataChange(newData);
	},

	renderEditorButton : function(){
		if(_.isNull(this.props.showEditorState)) return null;

		if(this.props.showEditorState){
			return <div className='editorButton' onClick={this.props.onEditorShowChange.bind(null, false)}>
				<i className='fa fa-chevron-left' />
				<span className='text'> hide editor </span>
			</div>
		}

		if(!this.props.showEditorState){
			return <div className='editorButton' onClick={this.props.onEditorShowChange.bind(null, true)}>
				<i className='fa fa-pencil' />
				<span className='text'> show editor </span>
			</div>
		}
	},


	renderErrors : function(){
		if(!this.errors) return;
		return <div className='errors'>{this.errors.toString()}</div>
	},

	render : function(){
		this.errors = null;

		var sheet;
		try{
			sheet = RenderSheet(this.props.sheet, this.handleChange);
			this.lastSheet = sheet;
		}catch(e){
			this.errors = e;
			sheet = this.lastSheet;
		}

		return <div className='renderer' ref='renderer' style={{height:this.state.height}}>
			{this.renderEditorButton()}
			<div className='sheets'>{sheet}</div>
			{this.renderErrors()}
		</div>
	}
});


module.exports = Renderer;
