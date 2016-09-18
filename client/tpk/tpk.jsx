const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');


const CreateRouter = require('pico-router').createRouter;


//PAGES
const HomePage = require('./homePage/homePage.jsx');
const NewPage = require('./newPage/newPage.jsx');
var EditPage = require('./editPage/editPage.jsx');


const CharacterPage = require('./characterPage/characterPage.jsx');

var Router;
const TPK = React.createClass({
	getDefaultProps: function() {
		return {
			url : '',
			ver : '0.0.0',

			sheet : {
				editId : null,
				shareId : null,
				title : '',

				template : '',
				data : {},
				logic : ''
			}
		};
	},

	componentWillMount: function() {
		Router = CreateRouter({

			'/edit/:id*' : (args) => {
				if(!this.props.sheet.editId){
					console.log('Error!');
					//return <ErrorPage ver={this.props.version} errorId={args.id}/>
				}

				return <EditPage
					ver={this.props.version}
					id={args.id}
					sheet={this.props.sheet} />

			},

			'/new' : (args) => {
				return <NewPage ver={this.props.version} />
			},
			'*' : <HomePage ver={this.props.version} />,
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
