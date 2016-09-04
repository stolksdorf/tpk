var React = require('react');
var _     = require('lodash');
var cx    = require('classnames');


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




var Pack = React.createClass({

	getDefaultProps: function() {
		return {
			data : {},

			/////
			style : {},
			//columns : 1,
			//rows : 1,
			//width : 1,
			//height : 1,
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
			console.log('cahnge', id, val);

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


			//May have to override display and positioning here
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
			return React.isValidElement(child) && child.props.is_box;
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
		return <div className='pack'>
			{this.renderChildren()}
		</div>
	}
});

module.exports = Pack;
