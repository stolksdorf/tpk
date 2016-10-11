const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');


const CreateRouter = require('pico-router').createRouter;


//PAGES
const HomePage = require('./pages/homePage/homePage.jsx');
const NewPage = require('./pages/newPage/newPage.jsx');
const EditPage = require('./pages/editPage/editPage.jsx');
const ViewPage = require('./pages/viewPage/viewPage.jsx');
const DocsPage = require('./pages/docsPage/docsPage.jsx');

var Router;
const TPK = React.createClass({
	getDefaultProps: function() {
		return {
			url : '',

			overrideData : null,

			sheet : {
				editId : null,
				shareId : null,
				title : '',

				template : '',
				data : {},
				logic : ''
			},


			templates : []
		};
	},

	componentWillMount: function(){
		global.version = this.props.ver;
		Router = CreateRouter({
			'/edit/:id*' : (args) => {
				return <EditPage
					id={args.id}
					sheet={this.props.sheet} />
			},
			'/template/:id*' : (args) => {
				return <ViewPage
					id={args.id}
					sheet={this.props.sheet} />
			},
			'/sheet/:id*' : (args, query) => {
				return <ViewPage
					id={args.id}
					overrideId={query.data}
					overrideData={this.props.overrideData}
					sheet={this.props.sheet} />
			},

			'/new*' : (args, query) => {
				return <NewPage query={query} />
			},
			'/docs' : (args) => {
				return <Docs />
			},
			'*' : (args) => {
				return <HomePage
					templates={this.props.templates}
				/>
			}
		});
	},

	componentDidMount: function() {
		document.addEventListener('keydown', this.preventSaveShortcut);
	},
	componentWillUnmount: function() {
		document.removeEventListener('keydown', this.preventSaveShortcut);
	},

	preventSaveShortcut : function(e){
		if(e.keyCode == 83 && (e.metaKey || e.ctrlKey)){
			e.stopPropagation();
			e.preventDefault();
		}
	},



	render : function(){
		return <div className='tpk'>
			<Router initialUrl={this.props.url}/>
		</div>
	}
});

module.exports = TPK;
