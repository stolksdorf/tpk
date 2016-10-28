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

			onChange: ()=>{}
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
			/*
			if(!get.width(child.props) || !get.height(child.props)){
				console.error('Element does not have a set width or height', get.id(child.props));
				return false;
			}
			*/
			return React.isValidElement(child);
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
				w : get.width(child.props, 1),
				h : get.height(child.props, 1),
			}
		}));


		//TODO: Add an error handler if we couldn't draw an element


		return _.map(validChildren, (child, idx) => {
			return this.renderChild(child, coords[idx]);
		});
	},

	renderGuides : function(){
		if(!this.props.guides) return;
		const cols = get.columns(this.props);
		const rows = get.rows(this.props);
		const guides =  _.flatten([
			_.times(cols + 1, (idx) => {
				return <div className='horizontal_guide' style={{left : `${idx*100/cols}%` }} />
			}),
			_.times(rows + 1, (idx) => {
				return <div className='vertical_guide' style={{top : `${idx*100/rows}%` }} />
			})
		]);
		return guides;

		return <div className='guideContainer'>{guides}</div>
	},

	render : function(){
		return <div className={cx('pack', this.props.className)} style={this.props.style}>
			{this.renderGuides()}
			{this.renderChildren()}
		</div>
	}
});

module.exports = Pack;
