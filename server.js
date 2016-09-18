'use strict';
var _ = require('lodash');
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


var baseTemplate = require('fs').readFileSync('./sample_sheet.txt', 'utf8');

//Load project version
var projectVersion = require('./package.json').version;




//Populate tpk routes
app = require('./server/tpk.api.js')(app);




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




var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);