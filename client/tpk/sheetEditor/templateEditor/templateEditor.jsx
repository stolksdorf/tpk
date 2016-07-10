var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var TemplateEditor = React.createClass({

	getDefaultProps: function() {
		return {
			value : '',
			onChange : function(){}
		};
	},

	handleTemplateChange : function(text){
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
		return <div className='templateEditor editor'>
			<CodeEditor
				ref='codeEditor'
				wrap={true}
				language='jsx'
				value={this.props.value}
				onChange={this.handleTemplateChange}
				onCursorActivity={this.handleCursorActivty} />
			/>
		</div>
	}
});

module.exports = TemplateEditor;
