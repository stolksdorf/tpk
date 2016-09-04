var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');

var get = require('../utils.js').get;
var BinPack = require('tpk/greedyrow.binpack.js');


var Pack = React.createClass({

	getDefaultProps: function() {
		return {
			data : {},
			style : {},
		};
	},

	getContainerDimensions : function(){
		return {
			w : get.columns(this.props),
			h : get.rows(this.props)
		}
	},


	renderChild : function(child, coords){
		if(!coords) return;
		var id = get.id(child.props);

		var onChange = (val) => {
			if(id){
				this.props.onChange(_.assign({}, this.props.data, {
					[id] : val
				}));
			}else if(child.props.onChange){
				child.props.onChange(val);
			}else{
				this.props.onChange(val);
			}
		};

		return React.cloneElement(child, {
			onChange : onChange,
			data : (id ? this.props.data[id] : this.props.data),

			style : _.assign({}, child.props.style, {
				position : 'absolute',

				left :  `${coords.x / get.columns(this.props) * 100}%`,
				top :   `${coords.y / get.rows(this.props) * 100}%`,

				width : `${coords.w / get.columns(this.props) * 100}%`,
				height :`${coords.h / get.rows(this.props) * 100}%`,
			}),
		})
	},

	renderChildren : function(){
		var validChildren = _.filter(React.Children.toArray(this.props.children), (child)=>{
			if(React.isValidElement(child)){
				if(!child.props.is_box) console.log('Attempting to render a non box', child);
				return child.props.is_box;;
			}
		});

		if(!validChildren.length) return [];

		//Think about optimizing later?
		/*
		if(validChildren.length == 1){
			return this.renderChild(validChildren[0], {x:0,y:0,w:get.width{}})
		}
		*/

		var coords = BinPack(this.getContainerDimensions(), _.map(validChildren, (child)=>{
			return {
				w : get.width(child.props),
				h : get.height(child.props),
			}
		}));

		return _.map(validChildren, (child, idx) => {
			return this.renderChild(child, coords[idx]);
		});
	},

	render : function(){
		return <div className='pack' style={this.props.style}>
			{this.renderChildren()}
		</div>
	}
});

module.exports = Pack;
