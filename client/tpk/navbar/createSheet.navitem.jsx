var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');

const Store = require('tpk/sheet.store.js');
const Actions = require('tpk/sheet.actions.js');

const CreateSheetNavItem = React.createClass({
	getDefaultProps: function() {
		return {
			onCreate : () => {}
		};
	},
	getInitialState: function() {
		return {
			isSaving : false,
			errors : null
		};
	},
	componentDidMount: function() {
		this.sheetHash = Store.getSheetHash();
		window.onbeforeunload = () => {
			if(this.state.isSaving || this.sheetHash != Store.getSheetHash()){
				return 'You have unsaved changes!';
			}
		};
	},
	componentWillUnmount: function() {
		window.onbeforeunload = ()=>{};
	},
	create : function(){
		this.setState({
			isSaving : true,
			errors : null
		});
		Actions.async.createSheet()
			.then((sheet) => {
				window.onbeforeunload = ()=>{};
				this.setState({ isSaving : false });
				this.props.onCreate(sheet);
			})
			.catch((err) => {
				console.log('ERROR', err, err.toString());
				this.setState({
					isSaving : true,
					errors : err,
				})
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
			return this.renderErrors();
		}
		if(this.state.isSaving){
			return <Nav.item icon='fa-spinner fa-spin' className='createSheetNav'>
				save...
			</Nav.item>
		}
		return <Nav.item icon='fa-save' className='createSheetNav' onClick={this.create}>
			save
		</Nav.item>
	}
})

module.exports = CreateSheetNavItem;