const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const Editors = {
	info     : require('./infoEditor/infoEditor.jsx'),
	template : require('./templateEditor/templateEditor.jsx'),
	data     : require('./dataEditor/dataEditor.jsx'),
	logic    : require('./logicEditor/logicEditor.jsx')
};

const EditorBar = require('./editorBar/editorBar.jsx');

const EDITOR = 'EDITOR_TYPE';


const Editor = React.createClass({
	getInitialState: function(){
		return {
			editorType : 'template', //template, logic, data, info
		};
	},

	paneHeight : 0,

	componentDidMount: function(){
		this.updateEditorSize();
		window.addEventListener('resize', this.updateEditorSize);
		this.changeEditorType(localStorage.getItem(EDITOR));
	},
	componentWillUnmount: function(){
		window.removeEventListener('resize', this.updateEditorSize);
	},
	updateEditorSize : function(){
		this.paneHeight = this.refs.main.parentNode.clientHeight - (this.refs.editorBar.getHeight() + 1);
		this.refs.editor.updateHeight(this.paneHeight);
	},

	changeEditorType : function(type){
		if(!type) return;
		this.setState({ editorType : type });
		localStorage.setItem(EDITOR, type);
	},

	render : function(){
		const EditorComp = Editors[this.state.editorType].component;

		return <div className='editor' ref='main'>
			<EditorBar
				ref='editorBar'
				selectedEditor={this.state.editorType}
				editors={Editors}
				onChange={this.changeEditorType} />
			<EditorComp ref='editor' height={this.paneHeight} />
		</div>
	}
});

module.exports = Editor;
