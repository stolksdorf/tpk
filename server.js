'use strict';
var _ = require('lodash');
require('app-module-path').addPath('./shared');
var vitreumRender = require('vitreum/render');
var bodyParser = require('body-parser')
var express = require("express");
var app = express();
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json({limit: '25mb'}));



var baseTemplate = require('fs').readFileSync('./sample_sheet.txt', 'utf8');


app.get('*', function (req, res) {
	vitreumRender({
		page: './build/tpk/bundle.dot',
		globals:{},
		prerenderWith : './client/tpk/tpk.jsx',
		initialProps: {
			url: req.originalUrl,
			base_template : baseTemplate
		},
		clearRequireCache : !process.env.PRODUCTION,
	}, function (err, page) {
		return res.send(page)
	});
});




var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);