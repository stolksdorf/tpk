const React = require('react');
const _ = require('lodash');
const cx = require('classnames');


/*
TODO
- Split off and make an editor component for each
- Pass down an error change handler
- Design much better tabs

*/

const Editors = {
	info     : require('./infoEditor/infoEditor.jsx'),
	template : require('./templateEditor/templateEditor.jsx'),
	data     : require('./dataEditor/dataEditor.jsx'),
	logic    : require('./logicEditor/logicEditor.jsx')
};

const EDITOR = 'EDITOR_TYPE';


const Editor = React.createClass({

	config : function(val){
		var config = {
			template : {
				get : ()=>{
					return Store.getSheet().template
				},
				set : (newTemplate)=>{
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
		this.paneHeight = this.refs.main.parentNode.clientHeight - (this.refs.editorBar.clientHeight + 1);
		this.refs.editor.updateHeight(this.paneHeight);
	},

	changeEditorType : function(type){
		if(!type) return;
		this.setState({ editorType : type });
		localStorage.setItem(EDITOR, type);
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
		Actions.resetData();
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

	//break out to it's own componet

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
		const EditorComp = Editors[this.state.editorType].component;

		return <div className='editor' ref='main'>
			{this.renderBar()}

			<EditorComp ref='editor' height={this.paneHeight} />
			{/*
			<CodeEditor
				ref='codeEditor'
				wrap={true}
				language={this.config().language}
				value={this.config().get()}
				onChange={this.handleChange}
				onCursorActivity={this.handleCursorActivty} />

			*/}
		</div>
	}
});

module.exports = Editor;
