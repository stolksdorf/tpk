"use strict";

var vitreumTasks = require("vitreum/tasks");
var gulp = require("gulp");


var gulp = vitreumTasks(gulp, {
	entryPoints: [
		'./client/tpk',
	],

	DEV: true,
	buildPath: "./build/",
	pageTemplate: "./client/template.dot",
	projectModules: ["./shared/naturalcrit","./shared/codemirror"],
	additionalRequirePaths : ['./shared', './node_modules'],
	assetExts: ["*.svg", "*.png", "*.jpg", "*.pdf", "*.eot", "*.otf", "*.woff", "*.woff2", "*.ico", "*.ttf"],
	serverWatchPaths: ["server"],
	serverScript: "server.js",
	libs: [
		"react",
		"react-dom",
		"lodash",
		"classnames",

		//From ./shared
		"codemirror",
		"codemirror/mode/gfm/gfm.js",
		'codemirror/mode/javascript/javascript.js',

		"moment",
		"superagent",
		"pico-flux"
	],
	clientLibs: [],
});

