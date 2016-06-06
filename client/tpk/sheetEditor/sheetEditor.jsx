var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var SheetEditor = React.createClass({
	getDefaultProps: function() {
		return {
			sheetValue : '',
			onChangeSheet : function(){},

			dataValue : {},
			onChangeData : function(){},


			onChangeLogic : function(){}
		};
	},
	cursorPosition : {
		line : 0,
		ch : 0
	},

	getInitialState: function() {
		return {
			editorType : 'sheet'
		};
	},

	componentDidMount: function() {
		var paneHeight = this.refs.main.parentNode.clientHeight;
		paneHeight -= this.refs.bar.clientHeight + 1;
		this.refs.codeEditor.codeMirror.setSize(null, paneHeight);
	},

	handleTextChange : function(type, text){

		if(this.state.editorType == 'sheet'){
			this.props.onChangeSheet(text);
		}else if(this.state.editorType == 'data'){
			try{
				this.props.onChangeData(JSON.parse(text));
			}catch(e){
				alert('json error')
			}

		}
	},
	handleCursorActivty : function(curpos){
		this.cursorPosition = curpos;
	},

	handleChangeEditor : function(type){
		this.setState({
			editorType : type
		})
	},

	//Called when there are changes to the editor's dimensions
	update : function(){
		this.refs.codeEditor.updateSize();
	},

	renderBar : function(){
		return <div className='bar' ref='bar'>
			<div
				className={cx('editorButton', {selected: this.state.editorType == 'sheet'})}
				onClick={this.handleChangeEditor.bind(null, 'sheet')}>
				<i className='fa fa-file-o' /> Sheet Template
			</div>
			<div
				className={cx('editorButton', {selected: this.state.editorType == 'data'})}
				onClick={this.handleChangeEditor.bind(null, 'data')}>
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
		if(this.state.editorType == 'sheet'){
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='jsx'
				value={this.props.sheetValue}
				onChange={this.handleTextChange.bind(null, 'sheet')}
				onCursorActivity={this.handleCursorActivty} />
		}else if(this.state.editorType == 'data'){
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={JSON.stringify(this.props.dataValue, null, '  ')}
				onChange={this.handleTextChange.bind(null, 'data')}
				onCursorActivity={this.handleCursorActivty} />

		}else if(this.state.editorType == 'logic'){
			/*
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={this.props.value}
				onChange={this.handleTextChange.bind(null, 'logic')}
				onCursorActivity={this.handleCursorActivty} />
			*/
		}
	},


	render : function(){
		return <div className='sheetEditor' ref='main'>
			{this.renderBar()}
			{this.renderEditor()}
		</div>
	}
});

module.exports = SheetEditor;
