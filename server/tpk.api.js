const _ = require('lodash');

const SheetModel = require('./sheet.model.js').model;



module.exports = (app) => {


	app.post('/api/sheet', (req, res) => {
		var newSheet = new SheetModel(req.body);
		newSheet.save(function(err, obj){
			if(err){
				console.error(err, err.toString(), err.stack);
				return res.status(500).send(`Error while creating new sheet, ${err.toString()}`);
			}
			return res.json(obj);
		});
	});

	app.put('/api/sheet/:id', function(req, res){
		SheetModel.find({editId : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find Sheet with that id");
			var resEntry = objs[0];

			resEntry = _.assign(resEntry, req.body);
			resEntry.updatedAt = new Date();

			resEntry.save(function(err, obj){
				if(err) return res.status(500).send("Error while saving");
				return res.status(200).send(obj);
			})
		});
	});


	app.get('/api/sheet/:id', function(req, res){
		SheetModel.find({editId : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find Sheet with that id");
			var resEntry = objs[0];

			return res.status(200).send(resEntry);
		});
	});




	return app;
}