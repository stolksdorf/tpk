const mongoose = require('mongoose');
const _ = require('lodash');
const utils = require('./utils');


const SheetSchema = mongoose.Schema({

	//TODO: Issues with duplicate shareid

	editId  : { type : String, default: utils.genId.bind(null, 'e'), index: { unique: true } },
	viewId  : { type : String, default: utils.genId.bind(null, 'v'), index: { unique: true } },

	//depricate
	shareId : { type : String, default: utils.genId.bind(null, 's'), index: { unique: true } },

	info : {
		title     : {type : String,  default : ''},
		desc      : {type : String,  default : ''},
		published : {type : Boolean, default : false}
	},
	template : {type : String, default : ''},
	logic    : {type : String, default : ''},
	data     : {type : Object, default : {}},

	createdAt     : { type: Date, default: Date.now },
	updatedAt   : { type: Date, default: Date.now},
	//lastViewed  : { type: Date, default: Date.now},
}, { versionKey: false });

SheetSchema.statics.get = (query, cb) => {
	return Sheet.find(query, {_id : 0, __v : 0}, cb);
};

SheetSchema.statics.search = (query, page=0, limit=10) => {
	return new Promise((resolve)=>{
		Sheet.find({
			'info.published' : true
		}, {_id : 0, __v : 0},
		{
			skip : page * limit,
			limit : limit
		}, (err, res) => {
			if(err) throw err;
			resolve(res);
		});
	});
}

const Sheet = mongoose.model('Sheet', SheetSchema);

module.exports = {
	schema : SheetSchema,
	model : Sheet,
}