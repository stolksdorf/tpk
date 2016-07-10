var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');

var CharacterEditor = React.createClass({

	getDefaultProps: function() {
		return {
			value : {},
			onChange : function(){}
		};
	},

	handleCharacterChange : function(text){
		try{
			this.props.onChange(JSON.parse(text));
		}catch(e){
			console.log('JSON PARSE ERROR: HANDLE THIS BRUH');
		}
	},

	handleCursorActivty : function(curpos){
		this.cursorPosition = curpos;
	},

	cursorPosition : {
		line : 0,
		ch : 0
	},

	render : function(){
		return <div className='characterEditor editor'>
			<CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={JSON.stringify(this.props.value, null, '  ')}
				onChange={this.handleCharacterChange}
				onCursorActivity={this.handleCursorActivty} />
			/>
		</div>
	}
});

module.exports = CharacterEditor;
