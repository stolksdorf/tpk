var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');

var Nav = require('naturalcrit/nav/nav.jsx');

const Store = require('tpk/sheet.store.js');
const Actions = require('tpk/sheet.actions.js');

const SAVE_TIMEOUT = 3000;


const SaveSheetNavItem = React.createClass({
	mixins : [Store.mixin()],
	getDefaultProps: function() {
		return {
			editId : ''
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
		if(this.hasChanges()){
			this.setState({
				isPending : true
			});
			this.debounceSave();
			this.sheetHash = JSON.stringify(Store.getSheet());
		}else{
			this.debounceSave.cancel()
		}
	},

	componentDidMount: function() {
		this.debounceSave = _.debounce(this.save, SAVE_TIMEOUT);
		window.onbeforeunload = ()=>{
			if(this.state.isSaving || this.state.isPending){
				return 'You have unsaved changes!';
			}
		};
		this.sheetHash = JSON.stringify(Store.getSheet());
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
		document.onkeydown = function(){};
	},
	hasChanges : function(){
		return this.steetHash !== JSON.stringify(Store.getSheet());
	},
	save : function(){
		this.debounceSave.cancel();
		this.setState({
			isSaving : true,
			isPending : false,
			errors : null
		});

		request
			.put('/api/sheet/' + this.props.editId)
			.send(Store.getSheet())
			.end((err, res) => {
				if(err){
					console.log('ERROR', err, err.toString());
					this.setState({
						errors : err,
					})
				}else{
					this.savedSheet = res.body;
					this.setState({
						isPending : false,
						isSaving : false,
						lastUpdated : res.body.updatedAt
					})
				}
			})
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
			return this.renderErrors();
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

module.exports = SaveSheetNavItem;