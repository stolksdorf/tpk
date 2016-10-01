var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');


var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');



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

	handleSheetUpdate : function(newData){
		//if override id, save it


		this.setState({
			overrideData : newData
		}, this.trySave);

	},

	create : function(){
		this.setState({
			isSaving : true,
			errors : null
		});
		request
			.post('/api/override/')
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
				//TODO: Uncomment later
				//localStorage.removeItem(KEY);
				window.location = `/sheet/${this.props.sheet.viewId}?data=${data.id}`;
			});
	},

	save : function(){
		//this.debounceSave.cancel();
		this.setState({
			isSaving : true,
			isPending : false,
			errors : null
		});

		request
			.put('/api/sheet/' + this.props.sheet.editId)
			.send(this.state.sheet)
			.end((err, res) => {
				if(err){
					console.log('ERROR', err);
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

	trySave : function(){

		if(!this.props.overrideId){
			console.log('saving', this.getOverriddenSheet());

			localStorage.setItem(KEY, JSON.stringify(this.getOverriddenSheet()));
		}else{
			//kick off save
		}

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

	renderSaveButton : function(){
		if(this.state.isSaving){
			return <Nav.item className='save' icon='fa-spinner fa-spin'>saving...</Nav.item>
		}

		if(!this.props.overrideId){
			return <Nav.item className='save' icon='fa-save' onClick={this.create}>create</Nav.item>
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
				{this.renderSaveButton()}
				<PrintNavItem href={this.getPrintHref()} />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},


	render : function(){

		return <div className='page viewPage'>
			{this.renderNavbar()}

			<div className='content'>
				<Renderer
					sheet={this.getOverriddenSheet()}
					onChange={this.handleSheetUpdate}
				/>
			</div>
		</div>
	}
});

module.exports = ViewPage;
