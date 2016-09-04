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


/*
var getProp = (props, name, def) => {
	var res;
	if(name == 'id') res =
		if(props.id) return props.id;
		if(props.title) return _.snakeCase(props.title);
		if(props.label) return _.snakeCase(props.label);
		return props.name;


	if(name == 'width') res = props.width || props.w;
	if(name == 'height') res = props.height || props.h;
	if(name == 'rows') res = props.rows || props.r;
	if(name == 'columns') res = props.columns || props.cols || props.c;
	return res || def;
}
*/


var Box = React.createClass({
	//mixins : [utils],
	getDefaultProps: function() {
		return {
			shadow : false,
			border : false,

			data : {},


			/////
			style : {},
			columns : 1,
			rows : 1,
			width : 1,
			height : 1,
		};
	},

/*
	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleChange : function(newData){
		//this.updateData(newData);

		this.props.onChange(newData);
	},
*/

	getContainerDimensions : function(){
		return {
			w : get.columns(this.props),
			h : get.rows(this.props)
		}
	},

/*
	getBinPack : function(){
		var boxes = React.Children.map(this.props.children, (child)=>{
			if(!React.isValidElement(child)) return null;
			return {
				w : child.props.width || child.props.w || 1,
				h : child.props.height || child.props.h || 1,
			}
		});

		return pack(this.props.columns, this.props.rows, boxes);

	},
*/

	renderChild : function(child, coords){
		var id = get.id(child.props);

		var onChange = (val) => {
			if(id){
				this.props.data[id] = val;
				this.props.onChange(this.props.data);
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
				left :  `${coords.x / get.columns(this.props) * 100}%`,
				top :   `${coords.y / get.rows(this.props) * 100}%`,

				width : `${coords.w / get.columns(this.props) * 100}%`,
				height :`${coords.h / get.rows(this.props) * 100}%`,
			}),
		})

	},

	renderChildren : function(){

		var validChildren = _.filter(React.Children.toArray(this.props.children), (child)=>{
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
				w : get.width(child.props),
				h : get.height(child.props),
			}
		}));

		return _.map(validChildren, (child, idx) => {
			return this.renderChild(child, coords[idx]);
		});

		//loop and render each

////////////////////////////

/*

		return React.Children.map(this.props.children, (child, idx)=>{
			if(!React.isValidElement(child)) return null;

			//renderChild here

			var getChildId = (props) => {
				if(props.id) return props.id;
				if(props.title) return _.snakeCase(props.title);
				if(props.label) return _.snakeCase(props.label);
				return props.name;
			};

			var childId = getChildId(child.props);

			//Create an onChange listenr

			var getChildData = () => {
				if(!childId) return this.props.data;
				return this.props.data[childId];
			}

			//console.log('childId', getChildId(child.props), typeof this.props.data);



		})

*/
	},
	renderTitle : function(){
		if(this.props.title) return <h5 className='title'>{this.props.title}</h5>
	},
	renderLabel : function(){
		if(this.props.label) return <h5 className='label'>{this.props.label}</h5>
	},

	render : function(){
		/*
		var style = _.assign({}, this.props.style, {


		})
		*/
		/*
		if(this.props.containerColumnCount){
			style.width = this.props.width/this.props.containerColumnCount*100 + '%';
		}
		if(this.props.containerRowCount && this.props.height){
			style.height = this.props.height/this.props.containerRowCount*100 + '%';
		}

		console.log(this.getBinPack());
		*/

		return <div className={cx('box', this.props.className, {
				shadow : this.props.shadow,
				border : this.props.border
			})} style={this.props.style}>
			<div className={cx('content' /*, {expand : this.props.height || this.props.rows>1} */)}>
				{this.renderTitle()}
				{this.renderChildren()}
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = Box;
