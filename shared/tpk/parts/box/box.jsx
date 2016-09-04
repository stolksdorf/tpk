var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var get = require('../utils.js').get;
var BinPack = require('tpk/greedyrow.binpack.js');




var Box = React.createClass({
	getDefaultProps: function() {
		return {
			is_box : true,
			data : {},
			style : {},


			shadow : false,
			border : false,
			label : '',
			title : ''
		};
	},

	renderChildren : function(){
		return React.Children.map(this.props.children, (child)=>{
			if(!React.isValidElement(child)) return null;
			var id = get.id(child.props);

			var onChange = (val) => {
				if(id){
					this.props.onChange(_.assign({}, this.props.data, {
						[id] : val
					}));
				}else if(child.props.onChange){
					return child.props.onChange(val);

				}else{
					this.props.onChange(val);
				}
			};

			return React.cloneElement(child, {
				onChange : onChange,
				data : (id ? this.props.data[id] : this.props.data),

				style : _.assign({}, child.props.style, {
					width  : `${get.width(child.props) / get.columns(this.props) * 100}%`,
					height : `${get.height(child.props) / get.rows(this.props) * 100}%`,
				}),

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
		return <div className={cx('box', this.props.className, {
				shadow : this.props.shadow,
				border : this.props.border,
				flex : get.columns(this.props) !== 1
			})} style={this.props.style}>
			<div className={cx('content', {expand : get.height(this.props) || get.rows(this.props)>1})}>
				{this.renderTitle()}
				{this.renderChildren()}
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = Box;
