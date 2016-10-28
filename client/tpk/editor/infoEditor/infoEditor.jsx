const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');
const Actions = require('tpk/sheet.actions.js');
const Store = require('tpk/sheet.store.js');


const infoEditor = {
	icon : 'fa-rocket',
	name : 'info',

	component : React.createClass({
		mixins:[Store.mixin()],
		getDefaultProps: function() {
			return {
				height : 0
			};
		},
		getInitialState: function() {
			return {
				info: JSON.stringify(Store.getInfo(), null, '\t'),
				errors : null
			};
		},
		onStoreChange : function(){
			this.setState({info: JSON.stringify(Store.getInfo(), null, '\t') });
		},

		componentDidMount: function() {
			this.updateHeight(this.props.height);
		},
		updateHeight : function(height){
			this.refs.codeEditor.codeMirror.setSize(null, height);
		},

		handleChange : function(text){
			//TODO: Wrap in try catch flag errors
			Actions.updateSheet({info : JSON.parse(text)});
		},

		renderErrors : function(){

		},

		render : function(){
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={this.state.info}
				onChange={this.handleChange} />
		}
	})
}

module.exports = infoEditor;