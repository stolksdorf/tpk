// Greedy row bin packing

var _ = require('lodash');


var container = {w:6, h:6};

var pack = (width, height, boxes) => {
	var currentRow = 0;
	var map = _.times(height, ()=>{
		return _.repeat('*', width);
	});
	var splice = (str, idx, add) => {
		return str.slice(0, idx) + add + str.slice(idx + add.length);
	}
	var fit = (box, id) =>{
		if(currentRow + box.h > height) return false;
		var index = map[currentRow].indexOf(_.repeat('*', box.w));
		if(index == -1){
			currentRow += 1;
			return fit(box, id);
		}
		var inject = _.repeat(id, box.w);
		_.times(box.h, (row)=>{
			map[currentRow + row] = splice(map[currentRow + row], index, inject);
		});
		return {x:index, y : currentRow};
	};
	var res = _.map(boxes, (box, idx) => {
		return fit(box, idx);
	});
	console.log(map.join('\n'));
	console.log('\n');
	return res;
}


pack(6,6,[
	{w:2,h:2},
	{w:1,h:3},
	{w:3,h:2},
	{w:4,h:1},
	{w:2,h:2},
	{w:2,h:2},
	{w:6,h:6},
	{w:1,h:1},
]);

pack(6,6,[
	{w:3,h:2},
	{w:3,h:1},
	{w:3,h:2},
	{w:4,h:1},
	{w:3,h:2},
]);

pack(6,6,[
	{w:2,h:4},
	{w:2,h:2},
	{w:4,h:1},
]);

pack(6,6,[
	{w:1,h:1},
	{w:1,h:3},
	{w:1,h:4},
	{w:3,h:1},
	{w:3,h:1},
	{w:1,h:1},
	{w:2,h:1},
	{w:2,h:1},
]);
