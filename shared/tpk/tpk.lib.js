module.exports = {
	roll : (diceString) => {
		var dNotation = diceString.match(/([\d]*)d([\d]+)/);
		if(dNotation === null) return 'err';
		var num = Number(dNotation[1] || 1);
		var type = Number(dNotation[2] || 6);

		return _.times(num, ()=>{
			return _.random(1, type);
		});


	}
}