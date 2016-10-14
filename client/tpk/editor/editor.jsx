var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var CodeEditor = require('naturalcrit/codeEditor/codeEditor.jsx');
const Actions = require('tpk/sheet.actions.js');
const Store = require('tpk/sheet.store.js');

var Editor = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				template : '',
				data : {},
				info : {},
				logic : ''
			},

			onDividerColorChange : ()=>{},
			//onChange : ()=>{}
		}
	},


	config : function(val){
		var config = {
			template : {
				get : ()=>{
					return Store.getSheet().template
				},
				set : (newTemplate)=>{
					console.log('firing');
					Actions.updateSheet({
						template : newTemplate
					});
				},
				language : 'jsx',
				icon : 'fa-file'
			},
			data : {
				get : ()=>{
					return JSON.stringify(Store.getSheet().data, null, '\t')
				},
				set : (newData)=>{
					Actions.updateSheet({
						data : JSON.parse(newData)
					});
				},
				icon : 'fa-user',
				language : 'javascript'
			},
			info : {
				get : ()=>{
					return JSON.stringify(Store.getSheet().info, null, '\t')
				},
				set : (newInfo)=>{
					Actions.updateSheet({
						info : JSON.parse(newInfo)
					});
				},
				icon : 'fa-rocket',
				language : 'javascript'
			},
			logic : {
				get : ()=>{
					return Store.getSheet().logic
				},
				set : (newLogic)=>{
					Actions.updateSheet({
						logic : newLogic
					});
				},
				icon : 'fa-gear',
				language : 'javascript'
			},
		};
		return config[val || this.state.editorType];
	},



	getInitialState: function(){
		return {
			editorType : 'template', //template, logic, data, info
		};
	},
	componentDidMount: function(){
		this.updateEditorSize();
		window.addEventListener('resize', this.updateEditorSize);
	},
	componentWillUnmount: function(){
		window.removeEventListener('resize', this.updateEditorSize);
	},
	updateEditorSize : function(){
		var paneHeight = this.refs.editor.parentNode.clientHeight;
		paneHeight -= this.refs.editorBar.clientHeight + 1;
		this.refs.codeEditor.codeMirror.setSize(null, paneHeight);
	},


	handleChange : function(text){
		this.config().set(text);
	},
	changeEditorType : function(type, color){
		this.setState({
			editorType : type,
		});
		this.props.onDividerColorChange(color);
	},

	//Called when there are changes to the editor's dimensions
	update : function(){
		this.refs.codeEditor.updateSize();
	},

	export : function(){
		console.log(this.props.sheet);

		window.open('data:application/json;' +JSON.stringify(this.props.sheet, null, '  '));
	},
	import : function(){

		var temp = window.prompt("sometext","defaultText");
		if(temp){
			alert(temp);
		}
	},
	resetData : function(){
		//console.log(ProcessSheet.getDefaultData(this.props.sheet.template));
		//Actions.resetData();
	},


	renderOptionsMenu : function(){
		const opts = {
			"reset data" : {
				icon : 'fa-user-times',
				action : this.resetData
			},
			export : {
				icon : 'fa-upload',
				action : this.export
			},
			import : {
				icon : 'fa-download',
				action : this.import
			},
		}

		const options = _.map(opts, (opt, name) => {
			return <div onClick={opt.action}>
					<i className={`fa fa-fw ${opt.icon}`} />
					{name}
				</div>
		})

		return <div className='optionsMenu'>
			<i className=' fa fa-ellipsis-v' />
			<div className='options'>{options}</div>
		</div>
	},

	renderBar : function(){

		var colors= {
			template : '#ddd',
			data : '#FFDDBC',
			info : '#FF00BC',
			logic : '#9EDDDD',
		};

		var buttons = _.map(colors, (color, name) => {
			var config = this.config(name);

			return <div
				className={cx('editorButton', name)}
				style={{backgroundColor : colors}}
				onClick={this.changeEditorType.bind(null, name, color)}>
				<i className={cx('fa', config.icon)} /> {name}
			</div>
		});

		return <div className='editorBar' ref='editorBar' style={{backgroundColor : colors[this.state.editorType]}}>
			{buttons}
			{this.renderOptionsMenu()}
		</div>
	},


	render : function(){
		return <div className='editor' ref='editor'>
			{this.renderBar()}
			<CodeEditor
				ref='codeEditor'
				wrap={true}
				language={this.config().language}
				value={this.config().get()}
				onChange={this.handleChange}
				onCursorActivity={this.handleCursorActivty} />
		</div>
	}
});

module.exports = Editor;
