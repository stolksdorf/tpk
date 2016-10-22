var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');

var Nav = require('naturalcrit/nav/nav.jsx');

const Store = require('tpk/sheet.store.js');
const Actions = require('tpk/sheet.actions.js');

const SAVE_TIMEOUT = 3000;


const SaveDataNavItem = React.createClass({
	mixins : [Store.mixin()],
	getDefaultProps: function() {
		return {
			overrideId : null,
			sheetId : null,

			onCreate : () => {},
			onSave : () => {},
		};
	},
	getInitialState: function() {
		return {
			isPending: false,
			isSaving : false,
			errors : null
		};
	},
	onStoreChange : function(){
		if(!this.props.overrideId) return;
		if(this.hasChanges()){
			this.setState({
				isPending : true
			});
			this.debounceSave();
			this.sheetHash = Store.getSheetHash();
		}else{
			this.debounceSave && this.debounceSave.cancel()
		}
	},
	debounceSave : function(){},

	componentDidMount: function() {
		this.debounceSave = _.debounce(this.save, SAVE_TIMEOUT);
		window.onbeforeunload = ()=>{
			if(this.state.isSaving || this.state.isPending){
				return 'You have unsaved changes!';
			}
		};
		this.sheetHash = Store.getSheetHash();
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
	},
	hasChanges : function(){
		return this.sheetHash !== Store.getSheetHash();
	},

	create : function(){
		this.setState({
			isSaving : true,
			errors : null
		});
		Actions.async.createOverride(this.props.sheetId)
			.then((override) => {
				this.setState({
					isSaving : false,
				});
				this.props.onCreate(override);
			})
			.catch((err) => {
				console.log('ERROR', err, err.toString());
				this.setState({
					errors : err,
				});
			})
	},

	save : function(){
		this.debounceSave.cancel();
		this.setState({
			isSaving : true,
			isPending : false,
			errors : null
		});
		Actions.async.saveOverride(this.props.overrideId)
			.then((override) => {
				this.setState({
					isPending : false,
					isSaving : false,
				});
				this.props.onSave();
			})
			.catch((err) => {
				console.log('ERROR', err, err.toString());
				this.setState({
					errors : err,
				});
			});
	},

	renderErrors : function(){
		var errMsg = '';
		try{
			errMsg += this.state.errors.toString() + '\n\n';
			errMsg += '```\n' + JSON.stringify(this.state.errors.response.error, null, '  ') + '\n```';
		}catch(e){}


		return <Nav.item className='save error' icon="fa-warning">
			Oops!
			<div className='errorContainer'>
				Looks like there was a problem saving. <br />
				Report the issue <a target='_blank' href={'https://github.com/stolksdorf/naturalcrit/issues/new?body='+ encodeURIComponent(errMsg)}>
					here
				</a>.
			</div>
		</Nav.item>
	},

	render : function(){

		if(this.state.errors){
			//return this.renderErrors();
		}

		if(!this.props.overrideId){
			return <Nav.item
				className='createNav'
				icon='fa-user'
				color='orange'
				onClick={this.create}>save character</Nav.item>
		}


		if(this.state.isSaving){
			return <Nav.item className='save' icon="fa-spinner fa-spin">saving...</Nav.item>
		}
		if(!this.state.isPending && !this.state.isSaving){
			return <Nav.item className='save saved'>saved.</Nav.item>
		}
		if(this.state.isPending){
			return <Nav.item className='save' onClick={this.save} color='blue' icon='fa-save'>Save Now</Nav.item>
		}
	}
})

module.exports = SaveDataNavItem;