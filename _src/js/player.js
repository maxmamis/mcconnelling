import $ from 'jquery';
import {audioplayer} from './youtube-audio.js';

var $player, $videoElements = [], currentVideoElementIndex = 0, currentMcconnell, currentVideoIndex;

export var player = {
	init: function () {
		$player = $('#player');
		createVideoElements();
	},
	load: function (mcconnell) {
		if (!audioplayer.ready) {
			return audioplayer.onReady(function () {
				player.load(mcconnell)
			});
		}
		currentMcconnell = mcconnell;
		currentVideoIndex = -1;
		audioplayer.loadWithUrlAndSeconds(mcconnell.sound.url, mcconnell.sound.start);
	},
	play: function () {
		console.log('playing? ', audioplayer.ready)

		if (!audioplayer.ready) {
			return audioplayer.onReady(function () {
				console.log('audioplayer ready now, playing')
				player.play()
			});
		}
		setupNextVideo();
		nextVideo();
		audioplayer.play();
	}
};

function createVideoElements () {
	var $video;
	for (var i = 0; i < 2; i++) {
		$video = $('<video />');
		$player.append($video);
		$video.on('ended', nextVideo);
		$videoElements.push($video);
	}
	$videoElements[1].hide();
}

function setupNextVideo () {
	currentVideoIndex++;
	if (currentVideoIndex >= currentMcconnell.clips.length) {
		currentVideoIndex = 0;
	}
	var	videoElement = getNextVideoElement()[0];
	videoElement.src = 'http://mcconnelling.s3-website-us-east-1.amazonaws.com/vid/' + currentMcconnell.clips[currentVideoIndex] + '.mp4';
}

function nextVideo () {
	if (currentVideoIndex === 0) {
		audioplayer.loopbackNow();
	}

	let $videoElement = $videoElements[currentVideoElementIndex];
	$videoElement.hide();
	$videoElement = switchPlayers();
	$videoElement.show();
	$videoElement[0].play();
	setupNextVideo();
}

function switchPlayers () {
	currentVideoElementIndex = getNextVideoElementIndex();
	return $videoElements[currentVideoElementIndex];
}

function getNextVideoElementIndex () {
	var nextIndex = currentVideoElementIndex + 1;
	if (nextIndex >= $videoElements.length) {
		nextIndex = 0;
	}
	return nextIndex;
}

function getNextVideoElement () {
	return $videoElements[getNextVideoElementIndex()];
}
