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
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/tpk';
mongoose.connect(mongoUri);
mongoose.connection.on('error', function(){
	console.log(">>>ERROR: Run Mongodb.exe ya goof!");
});



//Load project version
var projectVersion = require('./package.json').version;


//Populate API routes
const SheetModel = require('./server/sheet.model.js').model;
const OverrideModel = require('./server/override.model.js').model;
const SheetAPI = require('./server/sheet.api.js')(app);
require('./server/override.api.js')(app);
require('./server/admin.api.js')(app);



//Override Character Data middleware loader
app.use((req, res, next) => {
	if(!req.query.data) return next();

	OverrideModel.get({id : req.query.data}, (err, objs) => {
		if(err || !objs.length){
			return res.status(400).send(`Can't get that`);
		}
		req.overrideData = objs[0].toJSON().data;
		return next();
	});
});




/* PRINT PAGE */

app.get('/print/:id?', (req, res) => {
	SheetModel.get({viewId : req.params.id}, (err, objs) => {
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
				query : req.query,
				overrideData : req.overrideData,
			},
			clearRequireCache : !process.env.PRODUCTION,
		}, (err, page) => {
			return res.send(page)
		});
	});
});


app.get('/edit/:id*', (req, res, next) => {
	SheetModel.get({editId : req.params.id}, (err, objs) => {
		if(err || !objs.length){
			return res.status(400).send(`Can't get that`);
		}

		req.sheet = objs[0].toJSON();
		return next();
	});
});

app.get('/sheet/:id*', (req, res, next) => {
	SheetModel.get({viewId : req.params.id}, (err, objs) => {
		if(err || !objs.length){
			return res.status(400).send(`Can't get that`);
		}

		req.sheet = objs[0].toJSON();
		delete req.sheet.editId;

		return next();
	});
});

app.get('/template/:id*', (req, res, next) => {
	req.sheet = SheetAPI.getBaseTemplate(req.params.id);
	return next();
});

app.get('/', (req, res, next) => {
	SheetAPI.getPublishedSheets()
		.then((sheets) => {
			req.published = sheets;
			return next();
		})
		.catch((err) => {
			console.log(err);
			return next();
		});
})




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
			ver : projectVersion,

			overrideData : req.overrideData,
			sheet : req.sheet,

			templates : SheetAPI.getAllBaseTemplates(),
			published : req.published,
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