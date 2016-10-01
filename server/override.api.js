const _ = require('lodash');

const OverrideModel = require('./override.model.js').model;



module.exports = (app) => {


	app.post('/api/override', (req, res) => {
		var newOverride = new OverrideModel(req.body);
		newOverride.save(function(err, obj){
			if(err){
				console.error(err, err.toString(), err.stack);
				return res.status(500).send(`Error while creating new override, ${err.toString()}`);
			}
			return res.json(obj);
		});
	});

	app.put('/api/override/:id', function(req, res){
		OverrideModel.find({id : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find override with that id");
			var resEntry = objs[0];

			resEntry = _.assign(resEntry, req.body);
			resEntry.updatedAt = new Date();

			resEntry.save(function(err, obj){
				if(err) return res.status(500).send("Error while saving");
				return res.status(200).send(obj);
			})
		});
	});


	app.get('/api/override/:id', function(req, res){
		OverrideModel.get({id : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find override with that id");
			var resEntry = objs[0];

			return res.status(200).send(resEntry);
		});
	});



	return app;
}