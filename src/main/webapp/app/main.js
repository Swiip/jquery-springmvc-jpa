// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: [
				"underscore",
				"jquery"
			],
			exports: "Backbone"
		},
		"bootstrap": {
			deps: [
				"jquery"
			],
			exports: "jQuery"
		}
	},
	paths: {
		jquery: "../libs/jquery-1.8.0/jquery.min",
		bootstrap: "../libs/bootstrap-2.1.0/js/bootstrap.min",
		underscore: "../libs/underscore-1.3.3/underscore",
		backbone: "../libs/backbone-0.9.2/backbone",
		text: "../libs/require-2.0.6/text"
	}
});

require([
	'views/login',
	'routers/router'
], function( LoginView, Workspace ) {
	// Initialize routing and start Backbone.history()
	new Workspace();
	Backbone.history.start();

	// Initialize the application view
	new LoginView();
});
