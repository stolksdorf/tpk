const tpk = {
	roll : (diceString) => {
		var dNotation = diceString.match(/([\d]*)d([\d]+)/);
		if(dNotation === null) return 'err';
		var num = Number(dNotation[1] || 1);
		var type = Number(dNotation[2] || 6);

		return _.times(num, ()=>{
			return _.random(1, type);
		});


	},

	//Converts text into numbers the best it can
	num : (txt) => {
		const t = _.toNumber(txt);
		return (_.isNaN(t) || t == '' ? txt : t);
	},
	//Adds a leading '+' or '-' on to numbers
	mod : (val) => {
		const _val = tpk.num(val);
		if(_val > 0) return `+${_val}`;
		return _val;
	},
	add  : (x,y) => {return tpk.num(x) + tpk.num(y);},
	sub  : (x,y) => {return tpk.num(x) - tpk.num(y);},
	mult : (x,y) => {return tpk.num(x) * tpk.num(y);},
	div  : (x,y) => {return tpk.num(x) / tpk.num(y);},

};

module.exports = tpk;
