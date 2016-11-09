const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const Actions = require('tpk/sheet.actions.js');

const EditorBar = React.createClass({
	getDefaultProps: function() {
		return {
			selectedEditor : '',
			editors : {},
			onChange : ()=>{}
		};
	},

	export : function(){
		console.log(this.props.sheet);

		window.open('data:application/json;' +JSON.stringify(this.props.sheet, null, '  '));
	},
	import : function(){

		const temp = window.prompt("sometext","defaultText");
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

	getHeight : function(){
		return this.refs.main.clientHeight;
	},

	renderTabs : function(){
		return _.map(this.props.editors, (editor) => {
			return <div
				className={cx('editorButton', editor.name, {selected : editor.name == this.props.selectedEditor})}
				onClick={this.props.onChange.bind(null, editor.name)}>
				<i className={cx('fa', editor.icon)} /> {editor.name}
			</div>
		})
	},

	render : function(){
		return <div className='editorBar' ref='main'>
			{this.renderOptionsMenu()}
			{this.renderTabs()}
		</div>
	}
});

module.exports = EditorBar;
