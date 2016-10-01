'use strict';
const _ = require('lodash');
const fs = require('fs');
require('app-module-path').addPath('./shared');
var vitreumRender = require('vitreum/render');
var bodyParser = require('body-parser')
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json({limit: '25mb'}));

//Mongoose
var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/naturalcrit';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});


var baseTemplate = fs.readFileSync('./sample_sheet.txt', 'utf8');

//Load project version
var projectVersion = require('./package.json').version;


//Load all base templates
const baseTemplates = _.reduce(fs.readdirSync('./templates'), (r, file) => {
	const template = require(`./templates/${file}`);
	r[template.id] = template;
	return r;
}, {})




//Populate API routes
app = require('./server/sheet.api.js')(app);
app = require('./server/override.api.js')(app);


const SheetModel = require('./server/sheet.model.js').model;
const OverrideModel = require('./server/override.model.js').model;



/* PRINT PAGE */

app.get('/print/:id?', (req, res) => {
	SheetModel.find({viewId : req.params.id}, (err, objs) => {
		if(objs.length){
			req.sheet = objs[0].toJSON();
		}

		vitreumRender({
			page: './build/printPage/bundle.dot',
			globals:{},
			prerenderWith : './client/printPage/printPage.jsx',
			initialProps: {
				url: req.originalUrl,
				sheet : req.sheet,
				query : req.query
			},
			clearRequireCache : !process.env.PRODUCTION,
		}, (err, page) => {
			return res.send(page)
		});
	});
});




//TODO: Add in finding character data middleware






app.get('/edit/:id*', (req, res, next) => {
	SheetModel.find({editId : req.params.id}, (err, objs) => {
		if(err || !objs.length){
			return res.status(400).send(`Can't get that`);
		}

		req.sheet = objs[0].toJSON();
		return next();
	});
});

app.get('/sheet/:id*', (req, res, next) => {
	SheetModel.find({viewId : req.params.id}, (err, objs) => {
		if(err || !objs.length){
			return res.status(400).send(`Can't get that`);
		}

		req.sheet = objs[0].toJSON();
		delete req.sheet.editId;

		return next();
	});
});

app.get('/template/:id*', (req, res, next) => {
	req.sheet = baseTemplates[req.params.id];
	return next();
});




//Render Page
app.use((req, res) => {
	vitreumRender({
		page: './build/tpk/bundle.dot',
		globals:{
			version : projectVersion
		},
		prerenderWith : './client/tpk/tpk.jsx',
		initialProps: {
			url: req.originalUrl,
			//base_template : baseTemplate,
			//ver : projectVersion, ?

			sheet : req.sheet,
		},
		clearRequireCache : !process.env.PRODUCTION,
	}, (err, page) => {
		return res.send(page)
	});
});



/*
app.get('*', function (req, res) {
	vitreumRender({
		page: './build/tpk/bundle.dot',
		globals:{},
		prerenderWith : './client/tpk/tpk.jsx',
		initialProps: {
			url: req.originalUrl,
			base_template : baseTemplate,
			ver : projectVersion
		},
		clearRequireCache : !process.env.PRODUCTION,
	}, function (err, page) {
		return res.send(page)
	});
});
*/



var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);