var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var Store = require('tpk/store.js');
var Actions = require('tpk/actions.js');




var Editor = React.createClass({
	config : {
		template : {
			color : '#ddd',
			get : Store.getTemplate,
			set : Actions.changeTemplate,
			language : 'jsx'
		},
		character : {
			color : '#FFDDBC',
			get : Store.getCharacterData.bind(null, true),
			set : Actions.changeCharacterData,
			language : 'javascript'
		},
		logic : {
			color : '#9EDDDD',
			get : Store.getLogic,
			set : Actions.changeLogic,
			language : 'javascript'
		},
	},


	mixins : [Store.mixin()],
	getDefaultProps: function() {
		return {
			onEditorTypeChange : ()=>{}
		}
	},

	getInitialState: function(){


		return {
			editorType : 'template', //template, logic, character
			value : Store.getTemplate(),
		};
	},
	onStoreChange : function(){

		this.setState({
			value : this.getConfig().get(),
		});
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

	getConfig : function(){
		return this.config[this.state.editorType];
	},

	handleChange : function(text){
		this.getConfig().set(text);
		Actions.storeToLocal('TEMP_ID')
	},
	changeEditorType : function(type){
		this.setState({
			editorType : type,
			value : this.config[type].get()
		});
		this.props.onEditorTypeChange(type, this.config[type].color);
	},

	//Called when there are changes to the editor's dimensions
	update : function(){
		this.refs.codeEditor.updateSize();
	},

	renderBar : function(){

		return <div className='editorBar' ref='editorBar' style={{backgroundColor : this.getConfig().color}}>
			<div
				className={cx('editorButton template')}
				style={{backgroundColor : this.config.template.color}}
				onClick={this.changeEditorType.bind(null, 'template')}>
				<i className='fa fa-file-o' /> Sheet Template
			</div>
			<div
				className={cx('editorButton character')}
				style={{backgroundColor : this.config.character.color}}
				onClick={this.changeEditorType.bind(null, 'character')}>
				<i className='fa fa-user' /> Character Data
			</div>
			<div
				className={cx('editorButton logic')}
				style={{backgroundColor : this.config.logic.color}}
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
				language={this.getConfig().language}
				value={this.state.value}
				onChange={this.handleChange}
				onCursorActivity={this.handleCursorActivty} />


		</div>
	}
});

module.exports = Editor;


/*


*/