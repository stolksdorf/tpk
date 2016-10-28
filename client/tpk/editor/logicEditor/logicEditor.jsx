const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');
const Actions = require('tpk/sheet.actions.js');
const Store = require('tpk/sheet.store.js');


const LogicEditor = {
	icon : 'fa-gear',
	name : 'logic',

	component : React.createClass({
		mixins:[Store.mixin()],
		getDefaultProps: function() {
			return {
				height : 0
			};
		},
		getInitialState: function() {
			return {logic: Store.getLogic() };
		},
		onStoreChange : function(){
			this.setState({logic: Store.getLogic() });
		},

		componentDidMount: function() {
			this.updateHeight(this.props.height);
		},
		updateHeight : function(height){
			this.refs.codeEditor.codeMirror.setSize(null, height);
		},

		handleChange : function(text){
			Actions.updateSheet({logic : text});
		},
		render : function(){
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={this.state.logic}
				onChange={this.handleChange} />
		}
	})
}

module.exports = LogicEditor;
