// Custom JS Application Code (Revealing Module Pattern)

// If using JSLint for syntax debugging, include the following two lines for looser management
/*jslint browser: true, sloppy: true, white: true, vars: true*/
/*global $, console, alert, App*/

$(function() {
	App.init();

	$('#get-started').click(function(){
		$('#intro').fadeOut();
		$('#player').fadeIn();
	});

	$("#sortable").sortable({
	    revert: true
	});

	$('#clips.1').click(function(){
		$('.timeline-clip.1').toggleClass('active');
	});
	$('#clips.2').click(function(){
		$('.timeline-clip.2').toggleClass('active');
	});
	$('#clips.3').click(function(){
		$('.timeline-clip.3').toggleClass('active');
	});
});

var App = (function() {

	var settings = {
		"name": "McConnelling",
		"url": "mcconnelling.org",
		"version": "0.1.0"
	};

	var listen = function() {
		// Application Listeners can be loaded here for easy configuration
		console.log("Ready and Listening");
	};

	var init = function() {
		// Kick off the listeners
		listen();

		// Application has been initalized
		console.log(settings.name + "(v" + settings.version + ") Started");
	};

	return {
		init: init
	};

}());