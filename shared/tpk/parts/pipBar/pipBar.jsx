var React = require('react');
var _ = require('lodash');
var cx = require('classnames');


var PipBar = React.createClass({
	getDefaultProps: function() {
		return {
			base_name : 'pipbar',
			data : [],

			count : 1,
			alt : false
		};
	},

	handleChange : function(index){
		var data = !this.props.data[index];
		//data[index] = !data[index];

		this.props.onChange(_.assign([], this.props.data, {
			[index] : !this.props.data[index]
		}));
	},

	render : function(){

		var pips = _.chain(this.props.count).times((n)=>{
			return [
				<i key={n} onClick={this.handleChange.bind(null, n)} className={cx('fa', 'fa-fw', {
					'fa-circle-o' : !this.props.data[n] && !this.props.alt,
					'fa-circle' : this.props.data[n]  && !this.props.alt,
					'fa-square-o' : !this.props.data[n] && this.props.alt,
					'fa-square' : this.props.data[n]  && this.props.alt,
				})}/>,
				<hr key={n + 'hr'}/>
			]
		}).flatten().value();
		pips.pop();
		return <div className={cx('pipBar', {alt:this.props.alt})} style={this.props.style}>
			{pips}
		</div>
	}
});

module.exports = PipBar;
