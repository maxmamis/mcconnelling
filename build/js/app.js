// Custom JS Application Code (Revealing Module Pattern)

// If using JSLint for syntax debugging, include the following two lines for looser management
/*jslint browser: true, sloppy: true, white: true, vars: true*/
/*global $, console, alert, App*/

$(function() {
	App.init();

	$('#get-started').click(function(){
		$('#intro').fadeOut();
		$('#video').fadeIn();
	});

	$("#sortable").sortable({
	    revert: true
	});

	$('#clips-1').click(function(){
		$('#draggable1').toggleClass('active');
	});
	$('#clips-2').click(function(){
		$('#draggable2').toggleClass('active');
	});
	$('#clips-3').click(function(){
		$('#draggable3').toggleClass('active');
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

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('audioplayer', {
	height: '1px',
	width: '1px',
	videoId: 'R1QRTHHlJ-I',
	playerVars: {
		autoplay: '0',
		controls: '0',
		modestbranding: '1',
		showinfo: '0',
		iv_load_policy: '3',
		rel: '0'
	}
  });
}