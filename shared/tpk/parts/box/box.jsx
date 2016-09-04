var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var BinPack = require('tpk/greedyrow.binpack.js');


var get = {
	id : (props) => {
		return _.snakeCase(props.id || props.title || props.label || props.name);
	},

	width   : (props, def=1) => { return props.width || props.w || def },
	height  : (props, def=1) => { return props.height || props.h || def },

	rows    : (props, def=1) => { return props.rows || props.r || def },
	columns : (props, def=1) => { return props.columns || props.cols || props.c || def },
}

var Box = React.createClass({
	//mixins : [utils],
	getDefaultProps: function() {
		return {
			is_box : true,


			shadow : false,
			border : false,

			data : {},


			/////
			style : {},
			/*
			columns : 1,
			rows : 1,
			width : 1,
			height : 1,
			*/
		};
	},

	renderChildren : function(){
		return React.Children.map(this.props.children, (child)=>{
			if(!React.isValidElement(child)) return null;

			var id = get.id(child.props);

			var onChange = (val) => {
				if(id){
					this.props.data[id] = val;
					this.props.onChange(this.props.data);
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
