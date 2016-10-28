const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const Pip = require('../pip/pip.jsx');

const PipBar = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'pipbar',
			data : [],

			count : 1,

			//For pips
			alt : false,
			mod : false,
			star : false,
		};
	},

	handleChange : function(index){
		this.props.onChange(_.assign([], this.props.data, {
			[index] : !this.props.data[index]
		}));
	},

	getPipProps : function(){
		return {
			alt : this.props.alt,
			mod : this.props.mod,
			star : this.props.star
		};
	},

	renderPips : function(){
		return _.times(this.props.count, (idx) => {
			const isLast = this.props.count-1 == idx;
			return [<Pip
				data={this.props.data[idx]}
				onChange={this.handleChange.bind(null, idx)}
				{...this.getPipProps()} />,

				(isLast ? null : <hr />)];
		});
	},

	render : function(){
		return <div className={cx('pipBar', this.getPipProps())} style={this.props.style}>
			{this.renderPips()}
		</div>
	}
});

module.exports = PipBar;
