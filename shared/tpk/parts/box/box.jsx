var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var utils = require('../utils');

var Box = React.createClass({
	//mixins : [utils],
	getDefaultProps: function() {
		return {
			//name : 'box',
			defaultData : {},

			id : '',
			title : '',
			label : '',
			shadow : false,
			border : false,

			//containerColumnCount : 1,
			columns : 1,
			width : 1,

			rows : 1,
			height : 0
		};
	},

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleChange : function(newData){
		this.updateData(newData);
	},

	renderChildren : function(){
		return React.Children.map(this.props.children, (child)=>{
			if(!React.isValidElement(child)) return null;
			return React.cloneElement(child, {
				onChange : child.props.onChange || this.handleChange,
				data : this.data(),

				containerColumnCount : this.props.columns,
				containerRowCount : this.props.rows
			})
		})
	},
	renderTitle : function(){
		if(this.props.title) return <h5 className='title'>{this.props.title}</h5>
	},
	renderLabel : function(){
		if(this.props.label) return <h5 className='label'>{this.props.label}</h5>
	},

	render : function(){
		var style = {};
		if(this.props.containerColumnCount){
			style.width = this.props.width/this.props.containerColumnCount*100 + '%';
		}
		if(this.props.containerRowCount && this.props.height){
			style.height = this.props.height/this.props.containerRowCount*100 + '%';
		}


		return <div className={cx('box', this.props.className, {
				shadow : this.props.shadow,
				border : this.props.border,
				flex : this.props.columns !== 1
			})} style={style}>
			<div className={cx('content', {expand : this.props.height || this.props.rows>1})}>
				{this.renderTitle()}
				{this.renderChildren()}
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = Box;
