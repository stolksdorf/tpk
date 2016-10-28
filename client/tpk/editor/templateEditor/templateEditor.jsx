const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');
const Actions = require('tpk/sheet.actions.js');
const Store = require('tpk/sheet.store.js');


const TemplateEditor = {
	icon : 'fa-file',
	name : 'template',

	component : React.createClass({
		mixins:[Store.mixin()],
		getDefaultProps: function() {
			return {
				height : 0
			};
		},
		getInitialState: function() {
			return {template: Store.getTemplate() };
		},
		onStoreChange : function(){
			this.setState({template: Store.getTemplate() });
		},

		componentDidMount: function() {
			this.updateHeight(this.props.height);
		},
		updateHeight : function(height){
			this.refs.codeEditor.codeMirror.setSize(null, height);
		},


		handleChange : function(text){
			Actions.updateSheet({template : text});
		},

		render : function(){
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='jsx'
				value={this.state.template}
				onChange={this.handleChange} />
		}
	})
}

module.exports = TemplateEditor;
