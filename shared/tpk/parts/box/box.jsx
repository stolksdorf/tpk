var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var get = require('../utils.js').get;
var BinPack = require('tpk/greedyrow.binpack.js');


var Box = React.createClass({
	getDefaultProps: function() {
		return {
			data : {},
			style : {},

			space : false,
			shadow : false,
			border : false,
			expand : false,
			label : '',
			title : '',

			vertical : false,

			is_box : true,
			is_internal : false
		};
	},

	renderChildren : function(){
		if(this.props.is_internal) return this.props.children;

		return React.Children.map(this.props.children, (child, index)=>{
			if(!React.isValidElement(child)) return null;
			var id = get.id(child.props, index);

			var onChange = (val) => {
				if(child.props.onChange.toString() !== 'function onChange() {}'){
					return child.props.onChange(val);
				}else if(id){
					console.log('here');
					this.props.onChange(_.assign({}, this.props.data, {
						[id] : val
					}));
				}else{
					this.props.onChange(val);
				}
			};

			var style = {};

			if(get.width(child.props, 1)) style.width = `${get.width(child.props,1 ) / get.columns(this.props) * 100}%`;
			if(get.rows(this.props, false)) style.height = `${get.height(child.props, 1) / get.rows(this.props) * 100}%`;

			return React.cloneElement(child, {
				onChange : onChange,
				data : (id ? this.props.data[id] : this.props.data),
				style : _.assign({}, child.props.style, style),
				parentProps : (child.props.needsParentProps? this.props : null)
			})
		})
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
		return _.flatten([
			_.times(cols + 1, (idx) => {
				return <div className='horizontal_guide' style={{left : `${idx*100/cols}%` }} />
			}),
			_.times(rows + 1, (idx) => {
				return <div className='vertical_guide' style={{top : `${idx*100/rows}%` }} />
			})
		]);
	},

	render : function(){
		return <div className={cx('box', this.props.className, get.classes(this.props), {
				vertical : get.columns(this.props) == 1,
			})} style={this.props.style}>
			<div className={cx('content', /*{expand : get.height(this.props) || get.rows(this.props)>1} */)}>

				{this.renderGuides()}

				{this.renderTitle()}
				{this.renderChildren()}
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = Box;
