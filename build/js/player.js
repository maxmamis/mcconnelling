(function () {
window.MC = window.MC || {};
var player = window.MC.player = {};

var $player, $videoElements = [], currentVideoElementIndex = 0,
	currentMcconnell, currentVideoIndex;

var audioplayer = MC.audioplayer;

player.load = function (mcconnell) {
	if (!audioplayer.ready) {
		return audioplayer.onReady(function () {
			player.load(mcconnell)
		});
	}
	currentMcconnell = mcconnell;
	currentVideoIndex = -1;
	audioplayer.loadWithUrlAndSeconds(mcconnell.sound.url, mcconnell.sound.start);
};

player.play = function () {
	if (!audioplayer.ready) {
		return audioplayer.onReady(function () {
			player.play()
		});
	}
	setupNextVideo();
	nextVideo();
	audioplayer.play();
};

player.init = function () {
	$player = $('#player');
	createVideoElements();
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
	videoElement.src = '/_/vid/' + currentMcconnell.clips[currentVideoIndex] + '.mov';
}

function nextVideo () {
	// we're looping from the beginnning, start the audio over
	if (currentVideoIndex === 0) {
		audioplayer.loopbackNow();
	}

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