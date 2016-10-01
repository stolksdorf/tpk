const mongoose = require('mongoose');
const _ = require('lodash');
const utils = require('./utils');

const OverrideSchema = mongoose.Schema({
	id : {
		type : String,
		default: utils.genId.bind(null, 'd'),
		index: { unique: true }
	},

	data : {type : Object, default : {}},
	linkedSheetId : { type: String },

	createdAt   : { type: Date, default: Date.now },
	updatedAt   : { type: Date, default: Date.now},
	lastViewed  : { type: Date, default: Date.now},
}, { versionKey: false });

OverrideSchema.statics.get = (query, cb) => {
	Override.find(query, {_id : 0, __v : 0}, cb);
}


const Override = mongoose.model('Override', OverrideSchema);

module.exports = {
	schema : OverrideSchema,
	model : Override,
}