const _ = require('lodash');

const CharacterModel = require('./character.model.js').model;



module.exports = (app) => {


	app.post('/api/character', (req, res) => {
		var newCharacter = new CharacterModel(req.body);
		newCharacter.save(function(err, obj){
			if(err){
				console.error(err, err.toString(), err.stack);
				return res.status(500).send(`Error while creating new character, ${err.toString()}`);
			}
			return res.json(obj);
		});
	});

	app.put('/api/character/:id', function(req, res){
		CharacterModel.find({editId : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find character with that id");
			var resEntry = objs[0];

			resEntry = _.assign(resEntry, req.body);
			resEntry.updatedAt = new Date();

			resEntry.save(function(err, obj){
				if(err) return res.status(500).send("Error while saving");
				return res.status(200).send(obj);
			})
		});
	});


	app.get('/api/character/:id', function(req, res){
		CharacterModel.find({editId : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find character with that id");
			var resEntry = objs[0];

			return res.status(200).send(resEntry);
		});
	});



	return app;
}