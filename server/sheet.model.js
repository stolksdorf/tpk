const mongoose = require('mongoose');
const _ = require('lodash');
const utils = require('./utils');


const SheetSchema = mongoose.Schema({

	//TODO: Issues with duplicate shareid


	editId : { type : String, default: utils.genId.bind(null, 'e'), index: { unique: true } },
	shareId : { type : String, default: utils.genId.bind(null, 's'), index: { unique: true } },

	title : {type : String, default : ''},
	template : {type : String, default : ''},
	logic : {type : String, default : ''},
	data : {type : Object, default : ''},

	createdAt     : { type: Date, default: Date.now },
	updatedAt   : { type: Date, default: Date.now},
	lastViewed  : { type: Date, default: Date.now},
});



const Sheet = mongoose.model('Sheet', SheetSchema);

module.exports = {
	schema : SheetSchema,
	model : Sheet,
}