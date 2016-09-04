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
				color : '#ddd',
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
			character : {
				color : '#FFDDBC',
				get : ()=>{
					return JSON.stringify(this.props.sheet.data, null, '  ')
				},
				set : (newData)=>{
					this.props.onChange(_.assign(this.props.sheet, {
						data : JSON.parse(newData)
					}));
				},
				language : 'javascript'
			},
			logic : {
				color : '#9EDDDD',
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
			editorType : 'template', //template, logic, character
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
	changeEditorType : function(type){
		this.setState({
			editorType : type,
		});
		this.props.onDividerColorChange(this.config(type).color);
	},

	//Called when there are changes to the editor's dimensions
	update : function(){
		this.refs.codeEditor.updateSize();
	},

	renderBar : function(){

		return <div className='editorBar' ref='editorBar' style={{backgroundColor : this.config().color}}>
			<div
				className={cx('editorButton template')}
				style={{backgroundColor : this.config('template').color}}
				onClick={this.changeEditorType.bind(null, 'template')}>
				<i className='fa fa-file-o' /> Sheet Template
			</div>
			<div
				className={cx('editorButton character')}
				style={{backgroundColor : this.config('character').color}}
				onClick={this.changeEditorType.bind(null, 'character')}>
				<i className='fa fa-user' /> Character Data
			</div>
			<div
				className={cx('editorButton logic')}
				style={{backgroundColor : this.config('logic').color}}
				onClick={this.changeEditorType.bind(null, 'logic')}>
				<i className='fa fa-code' /> Sheet logic
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
