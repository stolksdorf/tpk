const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');
const Actions = require('tpk/sheet.actions.js');
const Store = require('tpk/sheet.store.js');


const DataEditor = {
	icon : 'fa-user',
	name : 'data',

	component : React.createClass({
		mixins:[Store.mixin()],
		getDefaultProps: function() {
			return {
				height : 0
			};
		},
		getInitialState: function() {
			return {
				data: JSON.stringify(Store.getData(), null, '\t'),
				errors : null
			};
		},
		onStoreChange : function(){
			this.setState({data: JSON.stringify(Store.getData(), null, '\t') });
		},

		componentDidMount: function() {
			this.updateHeight(this.props.height);
		},
		updateHeight : function(height){
			this.refs.codeEditor.codeMirror.setSize(null, height);
		},

		handleChange : function(text){
			//TODO: Wrap in try catch flag errors
			Actions.updateSheet({data : JSON.parse(text)});
		},

		renderErrors : function(){

		},

		render : function(){
			return <CodeEditor
				ref='codeEditor'
				wrap={true}
				language='javascript'
				value={this.state.data}
				onChange={this.handleChange} />
		}
	})
}

module.exports = DataEditor;