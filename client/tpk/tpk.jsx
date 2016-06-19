var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var Nav = require('naturalcrit/nav/nav.jsx');
var Navbar = require('./navbar/navbar.jsx');

var SplitPane = require('naturalcrit/splitPane/splitPane.jsx');
var SheetEditor = require('./sheetEditor/sheetEditor.jsx');
var SheetRenderer = require('./sheetRenderer/sheetRenderer.jsx');


var Process = require('./process.js');


const TPK_TEMPLATE = 'tpk_template';
const TPK_LOGIC = 'tpk_logic';

const SPLATSHEET_DATA = 'splatsheet_data';



var TPK = React.createClass({


	getInitialState: function() {
		return {
			sheetCode: "<Box>\n\t<TextInput label='test' />\n</Box>",

			sheetData : {},

			sheetLogic : '',


			processedData : {},
			logicErrors : null
		};
	},

	//remove later
	componentDidMount: function() {
		var data = JSON.parse(localStorage.getItem(SPLATSHEET_DATA)) || this.state.sheetData;
		var logic = localStorage.getItem(TPK_LOGIC) || this.state.sheetLogic


		this.setState({
			sheetCode : localStorage.getItem(TPK_TEMPLATE) || this.state.sheetCode,
			sheetLogic : logic,

			sheetData : data,

			processedData : this.processData(data, logic)
		})
	},

	handleSplitMove : function(){
		this.refs.editor.update();
	},

	handleCodeChange : function(code){
		this.setState({
			sheetCode : code
		});

		localStorage.setItem(TPK_TEMPLATE, code);
	},

	handleLogicChange : function(code){
		this.setState({
			sheetLogic : code,

			processedData : this.processData(this.state.sheetData, code)
		});

		localStorage.setItem(TPK_LOGIC, code);
	},

	handleDataChange : function(data){
		this.setState({
			sheetData : JSON.parse(JSON.stringify(data)),

			processedData : this.processData(data, this.state.sheetLogic)
		});
		localStorage.setItem(SPLATSHEET_DATA, JSON.stringify(data));
	},


	processData : function(sheetData, sheetLogic){

		var res = sheetData;
		try{
			var code = `(function(){'use strict';var data = ${JSON.stringify(sheetData)}; ${sheetLogic};return data;})();`;
			res = eval(code)
		}catch(e){
			console.log('err', e.toString());
		}

		return res;
	},





	render : function(){
		return <div className='tpk'>
			<div className='page'>
				<Navbar>
					<Nav.section>
						<Nav.item>
							yo dawg
						</Nav.item>
					</Nav.section>
				</Navbar>
				<div className='content'>
					<SplitPane onDragFinish={this.handleSplitMove} ref='pane'>
						<SheetEditor
							ref='editor'

							sheetValue={this.state.sheetCode}
							onChangeSheet={this.handleCodeChange}

							dataValue={this.state.sheetData}
							onChangeData={this.handleDataChange}

							sheetLogic={this.state.sheetLogic}
							onChangeLogic={this.handleLogicChange}

						/>
						<SheetRenderer
							code={this.state.sheetCode}
							characterData={this.state.processedData}
							onChange={this.handleDataChange} />
					</SplitPane>
				</div>
			</div>
		</div>
	}
});

module.exports = TPK;
