var React = require('react');
var cx = require('classnames');

module.exports = function(props){
	return <div className={cx('radio', props.className)} onClick={props.onChange.bind(null, !props.value)}>
		<i className={cx('fa', {
			'fa-circle-o' : !props.value,
			'fa-dot-circle-o' : props.value,
		})} />
	</div>
};