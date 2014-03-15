(function () {
window.MC = window.MC || {};
var player = window.MC.player = {};

var $player, $video, videoElement,
	currentMcconnell, currentVideoIndex;

player.load = function (mcconnell) {
	currentMcconnell = mcconnell;
	currentVideoIndex = 0;
};

player.play = function () {
	nextVideo()
	videoElement.play();
};

$(function () {
	$player = $('#player');
	createVideoElement();
});

function createVideoElement () {
	$video = $('<video />');
	$player.append($video);
	videoElement = $video[0];
	videoElement.addEventListener('ended', nextVideo);
}

function nextVideo () {
	currentVideoIndex++;
	if (currentVideoIndex >= currentMcconnell.clips.length) {
		currentVideoIndex = 0;
	}

	videoElement.src = '/videos/' + currentMcconnell.clips[currentVideoIndex] + '.mov';
}
}());