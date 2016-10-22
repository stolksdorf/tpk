const _ = require('lodash');

const SheetModel = require('./sheet.model.js').model;

module.exports = (app) => {


	app.get('/api/admin/dump', (req, res) => {
		SheetModel.find({}, (err, objs) => {
			return res.json(objs);
		})
	});

	return app;
}