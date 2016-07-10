var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var LogicEditor = React.createClass({

	getDefaultProps: function() {
		return {
			value : '',
			onChange : function(){}
		};
	},

	handleLogicChange : function(text){
		this.props.onChange(text);
	},

	handleCursorActivty : function(curpos){
		this.cursorPosition = curpos;
	},

	cursorPosition : {
		line : 0,
		ch : 0
	},

	render : function(){
		return <div className='logicEditor editor'>
			<CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={this.props.value}
				onChange={this.handleLogicChange}
				onCursorActivity={this.handleCursorActivty} />
			/>
		</div>
	}
});

module.exports = LogicEditor;
