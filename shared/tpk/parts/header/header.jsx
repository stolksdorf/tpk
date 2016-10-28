const React = require('react');
const _     = require('lodash');
const cx    = require('classnames');

const get = require('../utils.js').get;
const Box = require('../box/box.jsx');

/*
<Header
	id="test"
	title="COOL THINGS"
	label="Swank Name"
	r=1 c=3>
	<TextBox lines/>
	<TextBox title='neat'/>
</Header>
*/

const Header = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'header',
			data: {
				banner : '',
				content : {}
			}
		};
	},
	handleContentChange : function(newContent){
		this.props.onChange(_.assign({}, this.props.data, {
			content : _.assign({}, this.props.data.content, newContent)
		}));
	},
	handleBannerChange : function(e){
		this.props.onChange(_.assign({}, this.props.data, {
			banner : e.target.value
		}));
	},
	renderTitle : function(){
		if(!this.props.title) return;
		return <h1 className='title'>{this.props.title}</h1>
	},
	renderLabel : function(){
		if(!this.props.label) return;
		return <h5 className='label'>{this.props.label}</h5>
	},

	render : function(){
		return <div className='header'>
			<div className='background' />
			{this.renderTitle()}
			{this.renderLabel()}

			<input
				className='banner'
				type='text'
				value={this.props.data.banner}
				onChange={this.handleBannerChange} />

			<Box
				className='content'
				onChange={this.handleContentChange}
				data={this.props.data.content}
				space={true}
				rows={get.rows(this.props)}
				columns={get.columns(this.props)}>
				{this.props.children}
			</Box>
		</div>
	}
});

module.exports = Header;
