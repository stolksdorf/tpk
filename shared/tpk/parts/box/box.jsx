var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var pack = require('tpk/greedyrow.binpack.js');


var utils = require('../utils');

var Box = React.createClass({
	//mixins : [utils],
	getDefaultProps: function() {
		return {


			data : {},


			id : '',
			title : '',
			label : '',


			shadow : false,
			border : false,

			style : {},

			columns : 1,
			rows : 1,

			width : 1,
			height : 1,

		};
	},

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleChange : function(newData){
		//this.updateData(newData);

		this.props.onChange(newData);
	},

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

	renderChild : function(child){


	},

	renderChildren : function(){

		var coords = this.getBinPack();

		//get valid children, _.filter
		//if 1, skip bin pack
		//bin pack, get coords
		//loop and render each


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
			var onChange = (val) => {
				if(childId){
					this.props.data[childId] = val;
					this.props.onChange(this.props.data);
				}else if(child.props.onChange){
					child.props.onChange(val);
				}else{
					this.props.onChange(val);
				}
			};

			var getChildData = () => {
				if(!childId) return this.props.data;
				return this.props.data[childId];
			}

			//console.log('childId', getChildId(child.props), typeof this.props.data);


			return React.cloneElement(child, {









				onChange : onChange,
				data : getChildData(),

				style : _.assign({}, child.props.style, {
					left :  `${coords[idx].x/this.props.columns * 100}%`,
					top :   `${coords[idx].y/this.props.rows * 100}%`,
					width : `${coords[idx].w/this.props.columns * 100}%`,
					height :`${coords[idx].h/this.props.rows * 100}%`,
				}),

				/*
				containerColumnCount : this.props.columns,
				containerRowCount : this.props.rows
				*/
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
				border : this.props.border,
				/*flex : this.props.columns !== 1*/
			})} style={this.props.style}>
			<div className={cx('content', {expand : this.props.height || this.props.rows>1})}>
				{this.renderTitle()}
				{this.renderChildren()}
				{this.renderLabel()}
			</div>
		</div>
	}
});

module.exports = Box;
