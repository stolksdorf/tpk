"use strict";

var vitreumTasks = require("vitreum/tasks");
var gulp = require("gulp");


var gulp = vitreumTasks(gulp, {
	entryPoints: [
		'./client/tpk'
	],

	DEV: true,
	buildPath: "./build/",
	pageTemplate: "./client/template.dot",
	projectModules: ["./shared/naturalcrit","./shared/codemirror","./shared/tpk"],
	additionalRequirePaths : ['./shared', './node_modules'],
	assetExts: ["*.svg", "*.png", "*.jpg", "*.pdf", "*.eot", "*.otf", "*.woff", "*.woff2", "*.ico", "*.ttf"],
	serverWatchPaths: ["server"],
	serverScript: "server.js",
	libs: [
		"react",
		"react-dom",
		"lodash",
		"classnames",

		//"md5",

		//From ./shared
		"codemirror",
		//"codemirror/mode/gfm/gfm.js",
		'codemirror/mode/javascript/javascript.js',
		'codemirror/mode/jsx/jsx.js',

		//"moment",
		"superagent",
		"pico-router"
	],
	clientLibs: [],
});

