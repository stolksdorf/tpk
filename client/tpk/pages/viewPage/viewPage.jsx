var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');


var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');
var CloneNavItem = require('../../navbar/clone.navitem.jsx');

var Renderer = require('../../renderer/renderer.jsx');


//TODO: Move to utils?
var updateSheet = (sheet, field, newVal) => {
	if(_.isEqual(sheet[field], newVal)) return sheet;

	console.log('updating sheet');
	return _.assign(sheet, {
		[field] : _.assign(sheet[field], newVal)
	});
}


const KEY = 'PRINT';
//const CLONE_KEY = 'CLONE';
const SAVE_TIMEOUT = 3000;


var ViewPage = React.createClass({
	getDefaultProps: function() {
		return {
			overrideId : '',
			overrideData : {},

			sheet : {
				viewId : '',

				info : {
					title : '',
					desc : '',
					published : false
				},
				template : '',
				data : {},
				logic : '',
			},
		};
	},

	getInitialState: function() {
		let overrideData = this.props.overrideData;
		if(_.isEmpty(overrideData)) overrideData = this.props.sheet.data;

		return {
			overrideData : overrideData,

			isSaving : false,
			isPending : false,
			errors : null
		};
	},

	componentDidMount: function() {
		this.debounceSave = _.debounce(this.save, SAVE_TIMEOUT);
		window.onbeforeunload = ()=>{
			if(this.state.isSaving || this.state.isPending){
				return 'You have unsaved changes!';
			}
		};
	},

	componentWillUnmount: function() {
		window.onbeforeunload = function(){};
	},

	handleSheetUpdate : function(newData){
		this.setState({
			overrideData : newData,
			isPending : true
		}, this.trySave);
	},

	create : function(){
		this.setState({
			isSaving : true,
			errors : null
		});
		request
			.post('/api/override')
			.send({
				data : this.state.overrideData,
				linkedSheetId : this.props.sheet.viewId
			})
			.end((err, res)=>{
				if(err){
					this.setState({
						isSaving : false,
						errors : err
					});
					return;
				}
				window.onbeforeunload = function(){};
				var data = res.body;
				window.location = `/sheet/${this.props.sheet.viewId}?data=${data.id}`;
			});
	},

	save : function(){
		this.debounceSave.cancel();
		this.setState({
			isSaving : true,
			isPending : false,
			errors : null
		});
		request
			.put('/api/override/' + this.props.overrideId)
			.send({
				data : this.state.overrideData
			})
			.end((err, res) => {
				if(err){
					this.setState({
						errors : err,
					})
				}else{
					this.setState({
						isPending : false,
						isSaving : false,
					})
				}
			})
	},

	trySave : function(){
		if(!this.props.overrideId){
			localStorage.setItem(KEY, JSON.stringify(this.getOverriddenSheet()));
		}else{
			this.debounceSave();
		}
	},

	cloneSheet : function(){
		localStorage.setItem(CLONE_KEY, JSON.stringify(this.getOverriddenSheet()));
		window.open(`/new?local=${CLONE_KEY}`, '_blank').focus();
	},

	getOverriddenSheet : function(){
		return {
			...this.props.sheet,
			data : this.state.overrideData
		}
	},

	getPrintHref : function(){
		let query = `data=${this.props.overrideId}`;
		if(!this.props.overrideId) query = `local=${KEY}`;
		return `${this.props.sheet.viewId}?${query}`
	},

	/*
	renderTweakButton : function(){
		return <div className='tweak' >
			<i className='fa fa-gear' />
			<div className='content'>
				You can tweak the layout or logic of this sheet! <br />
				Would you like to clone this sheet, including the current data, into a brand new sheet?
				<button onClick={this.cloneSheet}>
					<i className='fa fa-clone' /> clone it!
				</button>
			</div>
		</div>
	},
	*/


	renderSaveButton : function(){
		if(this.state.isSaving){
			return <Nav.item className='save' icon='fa-spinner fa-spin'>saving...</Nav.item>
		}

		if(!this.props.overrideId){
			return <Nav.item
				className='save create'
				icon='fa-user'
				color='green'
				onClick={this.create}>save character</Nav.item>
		}


		if(!this.state.isPending && !this.state.isSaving){
			return <Nav.item className='save saved'>saved.</Nav.item>
		}
		if(this.state.isPending){
			return <Nav.item className='save' onClick={this.save} color='blue' icon='fa-save'>Save Now</Nav.item>
		}
	},

	renderNavbar : function(){
		return <Navbar>
			<Nav.section>
				<Nav.item>{this.props.sheet.info.title}</Nav.item>
			</Nav.section>
			<Nav.section>
				{this.renderSaveButton()}
				<PrintNavItem href={this.getPrintHref()} />
				<CloneNavItem sheet={this.getOverriddenSheet()} />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},


	render : function(){

		return <div className='page viewPage'>
			{this.renderNavbar()}

			<div className='content'>
				<Renderer />
			</div>
		</div>
	}
});

module.exports = ViewPage;
