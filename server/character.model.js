const mongoose = require('mongoose');
const _ = require('lodash');
const utils = require('./utils');

const CharacterSchema = mongoose.Schema({
	id : {
		type : String,
		default: utils.genId.bind(null, 'c'),
		index: { unique: true }
	},

	data : {type : Object, default : {}},

	createdAt     : { type: Date, default: Date.now },
	updatedAt   : { type: Date, default: Date.now},
	lastViewed  : { type: Date, default: Date.now},
});



const Character = mongoose.model('Character', CharacterSchema);

module.exports = {
	schema : CharacterSchema,
	model : Character,
}