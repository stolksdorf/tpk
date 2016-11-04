var _ = require('lodash');

module.exports = {

	greedyRow : (container, boxes) => {
		var currentRow = 0;
		var map = _.times(container.h, ()=>{
			return _.repeat('*', container.w);
		});
		var splice = (str, idx, add) => {
			return str.slice(0, idx) + add + str.slice(idx + add.length);
		}
		var fit = (box, id) =>{
			if(currentRow + box.h > container.h) return false;
			var index = map[currentRow].indexOf(_.repeat('*', box.w));
			if(index == -1){
				currentRow += 1;
				return fit(box, id);
			}
			var inject = _.repeat(id, box.w);
			_.times(box.h, (row)=>{
				map[currentRow + row] = splice(map[currentRow + row], index, inject);
			});
			return {
				x : index,
				y : currentRow,
				w : box.w,
				h : box.h
			};
		};
		var res = _.map(boxes, (box, idx) => {
			return fit(box, idx);
		});
		return res;
	},
	greedyCol : (container, boxes) => {
		var currentCol = 0;
		var map = _.times(container.w, ()=>{
			return _.repeat('*', container.h);
		});
		var splice = (str, idx, add) => {
			return str.slice(0, idx) + add + str.slice(idx + add.length);
		}
		var fit = (box, id) =>{
			if(currentCol + box.w > container.w) return false;
			var index = map[currentCol].indexOf(_.repeat('*', box.h));
			if(index == -1){
				currentCol += 1;
				return fit(box, id);
			}
			var inject = _.repeat(id, box.h);
			_.times(box.w, (col)=>{
				map[currentCol + col] = splice(map[currentCol + col], index, inject);
			});
			return {
				y : index,
				x : currentCol,
				w : box.w,
				h : box.h
			};
		};
		var res = _.map(boxes, (box, idx) => {
			return fit(box, idx);
		});
		return res;
	}
};



/*

pack({w:6,h:6},[
	{w:2,h:2},
	{w:1,h:3},
	{w:3,h:2},
	{w:4,h:1},
	{w:2,h:2},
	{w:2,h:2},
	{w:6,h:6},
	{w:1,h:1},
]);

pack({w:6,h:6},[
	{w:3,h:2},
	{w:3,h:1},
	{w:3,h:2},
	{w:4,h:1},
	{w:3,h:2},
]);

pack({w:6,h:6},[
	{w:2,h:4},
	{w:2,h:2},
	{w:4,h:1},
]);

pack({w:6,h:6},[
	{w:1,h:1},
	{w:1,h:3},
	{w:1,h:4},
	{w:3,h:1},
	{w:3,h:1},
	{w:1,h:1},
	{w:2,h:1},
	{w:2,h:1},
]);
*/