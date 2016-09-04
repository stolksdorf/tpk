var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var Editor = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				template : '',
				data : {},
				logic : ''
			},

			onDividerColorChange : ()=>{},
			onChange : ()=>{}
		}
	},


	config : function(val){
		var config = {
			template : {
				get : ()=>{
					return this.props.sheet.template
				},
				set : (newTemplate)=>{
					this.props.onChange(_.assign(this.props.sheet, {
						template : newTemplate
					}));
				},
				language : 'jsx'
			},
			data : {
				get : ()=>{
					return JSON.stringify(this.props.sheet.data, null, '\t')
				},
				set : (newData)=>{
					this.props.onChange(_.assign(this.props.sheet, {
						data : JSON.parse(newData)
					}));
				},
				language : 'javascript'
			},
			logic : {
				get : ()=>{
					return this.props.sheet.logic
				},
				set : (newLogic)=>{
					this.props.onChange(_.assign(this.props.sheet, {
						logic : newLogic
					}));
				},
				language : 'javascript'
			},
		};
		return config[val || this.state.editorType];
	},



	getInitialState: function(){
		return {
			editorType : 'template', //template, logic, data
		};
	},
	componentDidMount: function(){
		this.updateEditorSize();
		window.addEventListener("resize", this.updateEditorSize);
	},
	componentWillUnmount: function(){
		window.removeEventListener("resize", this.updateEditorSize);
	},
	updateEditorSize : function(){
		var paneHeight = this.refs.editor.parentNode.clientHeight;
		paneHeight -= this.refs.editorBar.clientHeight + 1;
		this.refs.codeEditor.codeMirror.setSize(null, paneHeight);
	},


	handleChange : function(text){
		this.config().set(text);
	},
	changeEditorType : function(type, color){
		this.setState({
			editorType : type,
		});
		this.props.onDividerColorChange(color);
	},

	//Called when there are changes to the editor's dimensions
	update : function(){
		this.refs.codeEditor.updateSize();
	},

	renderBar : function(){

		var colors= {
			template : '#ddd',
			data : '#FFDDBC',
			logic : '#9EDDDD',
		};

		return <div className='editorBar' ref='editorBar' style={{backgroundColor : colors[this.state.editorType]}}>
			<div
				className={cx('editorButton template')}
				style={{backgroundColor : colors.template}}
				onClick={this.changeEditorType.bind(null, 'template', colors.template)}>
				<i className='fa fa-file' /> Template
			</div>
			<div
				className={cx('editorButton data')}
				style={{backgroundColor : colors.data}}
				onClick={this.changeEditorType.bind(null, 'data', colors.data)}>
				<i className='fa fa-user' /> Data
			</div>
			<div
				className={cx('editorButton logic')}
				style={{backgroundColor : colors.logic}}
				onClick={this.changeEditorType.bind(null, 'logic', colors.logic)}>
				<i className='fa fa-gear' /> Logic
			</div>
		</div>
	},


	render : function(){
		return <div className='editor' ref='editor'>
			{this.renderBar()}
			<CodeEditor
				ref='codeEditor'
				wrap={true}
				language={this.config().language}
				value={this.config().get()}
				onChange={this.handleChange}
				onCursorActivity={this.handleCursorActivty} />
		</div>
	}
});

module.exports = Editor;
