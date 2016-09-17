const mongoose = require('mongoose');
const shortid = require('shortid');
const _ = require('lodash');

const SheetSchema = mongoose.Schema({
	shareId : {type : String, default: shortid.generate, index: { unique: true }},
	editId : {type : String, default: shortid.generate, index: { unique: true }},

	template : {type : String, default : ""},
	logic : {type : String, default : ""},
	character : {type : Object, default : ""},

	createdAt     : { type: Date, default: Date.now },
	updatedAt   : { type: Date, default: Date.now},
	lastViewed  : { type: Date, default: Date.now},
});



const Sheet = mongoose.model('Sheet', SheetSchema);

module.exports = {
	schema : SheetSchema,
	model : Sheet,
}