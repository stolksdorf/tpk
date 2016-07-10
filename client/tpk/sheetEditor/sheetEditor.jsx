var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

//REMOVE
var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var Store = require('tpk/store.js');
var Actions = require('tpk/actions.js');

var TemplateEditor = require('./templateEditor/templateEditor.jsx');
var LogicEditor = require('./logicEditor/logicEditor.jsx');
var CharacterEditor = require('./characterEditor/characterEditor.jsx');



var SheetEditor = React.createClass({
	mixins : [Store.mixin()],
	getDefaultProps: function() {
		return {}
	},

	getInitialState: function() {
		return {
			editorType : 'template', //template, logic, character

			template : Store.getTemplate(),
			logic : Store.getLogic(),
			character : Store.getCharacterData()
		};
	},
	onStoreChange : function(){
		this.setState({
			template : Store.getTemplate(),
			logic : Store.getLogic(),
			character : Store.getCharacterData()
		});
	},

	/*
	cursorPosition : {
		line : 0,
		ch : 0
	},
	*/


	handleTemplateChange : function(template){
		Actions.changeTemplate(template);
		Actions.storeToLocal('TEMP_ID')
	},

	handleLogicChange : function(logic){
		Actions.changeLogic(logic);
		Actions.storeToLocal('TEMP_ID')
	},
	handleCharacterChange : function(data){
		Actions.changeCharacterData(data);
		Actions.storeToLocal('TEMP_ID')
	},


	componentDidMount: function() {
		Actions.loadFromLocalStorage('TEMP_ID');
	},

/*

	fixEditorHeight : function(){
		var paneHeight = this.refs.main.parentNode.clientHeight;
		paneHeight -= this.refs.bar.clientHeight + 1;
		//this.refs.codeEditor.codeMirror.setSize(null, paneHeight);
	},

	handleTextChange : function(type, text){

		if(this.state.editorType == 'template'){
			this.props.onChangeSheet(text);
		}else if(this.state.editorType == 'data'){
			try{
				this.props.onChangeData(JSON.parse(text));
			}catch(e){
				alert('json error')
			}

		}else if(this.state.editorType == 'logic'){
			this.props.onChangeLogic(text);
		}
	},
	handleCursorActivty : function(curpos){
		this.cursorPosition = curpos;
	},


*/

	handleChangeEditor : function(type){
		this.setState({
			editorType : type
		})
	},

	renderBar : function(){
		return <div className='bar' ref='bar'>
			<div
				className={cx('editorButton', {selected: this.state.editorType == 'template'})}
				onClick={this.handleChangeEditor.bind(null, 'template')}>
				<i className='fa fa-file-o' /> Sheet Template
			</div>
			<div
				className={cx('editorButton', {selected: this.state.editorType == 'character'})}
				onClick={this.handleChangeEditor.bind(null, 'character')}>
				<i className='fa fa-user' /> Character Data
			</div>
			<div
				className={cx('editorButton', {selected: this.state.editorType == 'logic'})}
				onClick={this.handleChangeEditor.bind(null, 'logic')}>
				<i className='fa fa-code' /> Sheet logic
			</div>
		</div>
	},

	renderEditor : function(){
		if(this.state.editorType == 'template'){
			return <TemplateEditor
				value={this.state.template}
				onChange={this.handleTemplateChange}
			/>
		}else if(this.state.editorType == 'character'){
			return <CharacterEditor
				value={this.state.character}
				onChange={this.handleCharacterChange}
			/>


		}else if(this.state.editorType == 'logic'){
			return <LogicEditor
				value={this.state.logic}
				onChange={this.handleLogicChange}
			/>
		}
		//this.fixEditorHeight();
	},


	render : function(){
		return <div className='sheetEditor' ref='main'>
			{this.renderBar()}
			{this.renderEditor()}
		</div>
	}
});

module.exports = SheetEditor;
