var React = require('react');
var _ = require('lodash');
var cx = require('classnames');

var utils = require('../utils');

var PipBar = React.createClass({
	getDefaultProps: function() {
		return {
			name : 'pipbar',
			defaultData : [],


			count : 1,
			alt : false
		};
	},

	id : utils.id,
	data : utils.data,
	updateData : utils.updateData,

	handleChange : function(index){
		var data = this.data();
		data[index] = !data[index];
		this.updateData(data);
	},

	render : function(){

		var pips = _.chain(this.props.count).times((n)=>{
			return [
				<i key={n} onClick={this.handleChange.bind(null, n)} className={cx('fa', 'fa-fw', {
					'fa-circle-o' : !this.data()[n] && !this.props.alt,
					'fa-circle' : this.data()[n]  && !this.props.alt,
					'fa-square-o' : !this.data()[n] && this.props.alt,
					'fa-square' : this.data()[n]  && this.props.alt,
				})}/>,
				<hr key={n + 'hr'}/>
			]
		}).flatten().value();
		pips.pop();
		return <div className={cx('pipBar', {alt:this.props.alt})}>
			{pips}
		</div>
	}
});

module.exports = PipBar;
