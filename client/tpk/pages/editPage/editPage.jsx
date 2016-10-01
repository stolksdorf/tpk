var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');
var request = require('superagent');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('../../navbar/navbar.jsx');
//var EditTitle = require('../../navbar/editTitle.navitem.jsx');
var IssueNavItem = require('../../navbar/issue.navitem.jsx');
var PrintNavItem = require('../../navbar/print.navitem.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var Renderer = require('../../renderer/renderer.jsx');
var Editor = require('../../editor/editor.jsx');



const SAVE_TIMEOUT = 3000;

var EditPage = React.createClass({
	getDefaultProps: function() {
		return {
			sheet : {
				editId : '',
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
		return {
			sheet : this.props.sheet,

			isSaving : false,
			errors : null
		};
	},

	savedSheet : null,

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			sheet : nextProps.sheet
		})
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
		document.onkeydown = function(){};
	},

	handleSheetUpdate : function(newSheet){
		this.setState({
			sheet : _.assign({}, this.state, newSheet),
			isPending : true
		});

		this.trySave();
	},

	/*
	handleTitleChange : function(title){
		this.setState({
			sheet : _.assign({}, this.state.sheet, {title : title})
		});

		(this.hasChanges() ? this.debounceSave() : this.debounceSave.cancel());
	},
	*/


	hasChanges : function(){
		return true;

		//TOIDO: Add this logic in

		/*
		if(this.savedSheet){
			if(this.state.text !== this.savedSheet.text) return true;
			if(this.state.title !== this.savedSheet.title) return true;
		}else{
			if(this.state.text !== this.props.brew.text) return true;
			if(this.state.title !== this.props.brew.title) return true;
		}*/
		return false;
	},

	trySave : function(){
		if(this.hasChanges()){
			this.debounceSave()
		}else{
			this.debounceSave.cancel()
		}
	},


	save : function(){
		this.debounceSave.cancel();
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

	publishSheet : function(){
		if(!confirm('Ready to share your sheet with the world?')) return;

		this.setState({
			sheet : _.assign(this.state.sheet, {
				info : _.assign(this.state.sheet.info, {
					published : true
				})
			})
		}, this.save);
	},


	renderSaveButton : function(){
		if(this.state.errors){
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
		}

		if(this.state.isSaving){
			return <Nav.item className='save' icon="fa-spinner fa-spin">saving...</Nav.item>
		}
		if(!this.state.isPending && !this.state.isSaving){
			return <Nav.item className='save saved'>saved.</Nav.item>
		}
		if(this.state.isPending && this.hasChanges()){
			return <Nav.item className='save' onClick={this.save} color='blue' icon='fa-save'>Save Now</Nav.item>
		}
	},

	renderPublishNavItem : function(){
		if(this.state.sheet.info.published) return;

		return <Nav.item
			color='purple' icon='fa-rocket'
			onClick={this.publishSheet}>
			Publish
		</Nav.item>
	},

	renderNavbar : function(){
		return <Navbar>
			<Nav.section>
				<Nav.item>{this.state.sheet.info.title}</Nav.item>
			</Nav.section>
			<Nav.section>
				{this.renderSaveButton()}
				<Nav.item
					newTab={true} color='teal' icon='fa-share-alt'
					href={`/sheet/${this.props.sheet.viewId}/${_.snakeCase(this.props.sheet.info.title)}`}>
					Share
				</Nav.item>
				{this.renderPublishNavItem()}
				<PrintNavItem href={this.props.sheet.viewId} />
				<IssueNavItem />
			</Nav.section>
		</Navbar>
	},



	render : function(){
		return <div className='page editPage'>
			{this.renderNavbar()}

			<div className='content'>
				<SplitPane ref='pane'>
					<Editor
						sheet={this.state.sheet}
						onChange={this.handleSheetUpdate}
					/>
					<Renderer
						sheet={this.state.sheet}
						onChange={this.handleSheetUpdate}
					/>
				</SplitPane>
			</div>
		</div>
	}
});

module.exports = EditPage;
