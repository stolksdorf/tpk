var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var get = require('../utils.js').get;

//Only visually renders the box
var InternalBox = React.createClass({
	getDefaultProps: function() {
		return {
			space : false,
			shadow : false,
			border : false,
			expand : false,
			label : '',
			title : ''
		};
	},
	renderChildren : function(){
		return React.Children.map(this.props.children, (child, index)=>{
			if(!React.isValidElement(child)) return null;
			var style = {};
			if(get.width(child.props, 1)) style.width = `${get.width(child.props,1 ) / get.columns(this.props) * 100}%`;
			if(get.rows(this.props, false)) style.height = `${get.height(child.props, 1) / get.rows(this.props) * 100}%`;
			return React.cloneElement(child, {
				style : _.assign({}, child.props.style, style)
			});
		});
	},


	renderTitle : function(){
		if(this.props.title) return <h5 className='title'>{this.props.title}</h5>
	},
	renderLabel : function(){
		if(this.props.label) return <h5 className='label'>{this.props.label}</h5>
	},

	renderGuides : function(){
		if(!this.props.guides) return;
		const cols = get.columns(this.props);
		const rows = get.rows(this.props);
		const guides = _.flatten([
			_.times(cols + 1, (idx) => {
				return <div className='horizontal_guide' style={{left : `${idx*100/cols}%` }} />
			}),
			_.times(rows + 1, (idx) => {
				return <div className='vertical_guide' style={{top : `${idx*100/rows}%` }} />
			})
		]);
		return <div className='guideContainer'>{guides}</div>
	},

	render : function(){
		return <div
			className={cx('box', this.props.className, get.classes(this.props))}
			style={this.props.style}>

			<div className='outline'>
				{this.renderTitle()}
				<div className='content'>
					{this.renderGuides()}
					{this.renderChildren()}
				</div>
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = InternalBox;
