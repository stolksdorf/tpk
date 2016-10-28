const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const get = require('../utils.js').get;
const InternalBox = require('../internalBox/internalBox.jsx');

const Box = React.createClass({
	getDefaultProps: function() {
		return {
			data : {},
			onChange : ()=>{}
		};
	},

	renderChildren : function(){
		return React.Children.map(this.props.children, (child, index)=>{
			if(!React.isValidElement(child)) return null;
			const id = get.id(child.props, index);

			const onChange = (val) => {
				if(!id){
					return this.props.onChange(val);
				}
				this.props.onChange(_.assign({}, this.props.data, {
					[id] : val
				}));
			};

			return React.cloneElement(child, {
				onChange : onChange,
				data : (!id ? this.props.data : this.props.data[id]),

				parentProps : (child.props.needsParentProps? this.props : null)
			});
		});
	},

	render : function(){
		return <InternalBox {...this.props}>
			{this.renderChildren()}
		</InternalBox>
	}
});

module.exports = Box;
