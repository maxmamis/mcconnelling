(function () {
window.MC = window.MC || {};
var player = window.MC.player = {};

var $player, $videoElements = [], currentVideoElementIndex = 0,
	currentMcconnell, currentVideoIndex;

player.load = function (mcconnell) {
	currentMcconnell = mcconnell;
	currentVideoIndex = 0;
};

player.play = function () {
	setupNextVideo();
	nextVideo();
};

$(function () {
	$player = $('#player');
	createVideoElements();
});

function createVideoElements () {
	var $video;
	for (var i = 0; i < 2; i++) {
		$video = $('<video />');
		$player.append($video);
		$video.on('ended', nextVideo);
		$videoElements.push($video);
	}
}

function setupNextVideo () {
	currentVideoIndex++;
	if (currentVideoIndex >= currentMcconnell.clips.length) {
		currentVideoIndex = 0;
	}
	var	videoElement = getNextVideoElement()[0];
	videoElement.src = '/videos/' + currentMcconnell.clips[currentVideoIndex] + '.mov';
}

function nextVideo () {
	var $videoElement = $videoElements[currentVideoElementIndex];
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

}());