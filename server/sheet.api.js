const _ = require('lodash');
const fs = require('fs');

const SheetModel = require('./sheet.model.js').model;

//Load all base templates
const baseTemplates = _.reduce(fs.readdirSync('./templates'), (r, file) => {
	const template = require(`../templates/${file}`);
	r[template.viewId] = template;
	return r;
}, {});



const SetupRoutes = (app) => {
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
				console.log('ERR', err);
				if(err) return res.status(500).send(err);
				return res.status(200).send(obj);
			})
		});
	});

	//TODO :
	app.get('/api/sheet/search', function(req, res){
		SheetModel.get({info : { published : true}}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find Sheet with that id");
			var resEntry = objs[0];

			return res.status(200).send(resEntry);
		});
	});

	app.get('/api/sheet/:id', function(req, res){
		SheetModel.get({editId : req.params.id}, function(err, objs){
			if(!objs.length || err) return res.status(404).send("Can not find Sheet with that id");
			var resEntry = objs[0];

			return res.status(200).send(resEntry);
		});
	});
};


module.exports = (app) => {
	SetupRoutes(app);



	return {
		getBaseTemplate : (id) => {
			if(id == '*') return baseTemplates;
			return baseTemplates[id];
		},

		getAllBaseTemplates : () => {
			return _.map(baseTemplates, (temp) => {
				return {
					viewId : temp.viewId,
					info : temp.info,
				}
			})
		},




	};
}