var ytPlayer;

var currentURL, currentSeconds;
var readyCallbacks = [];

export var audioplayer = {
    ready: false,
    loadWithUrlAndSeconds: function (url, seconds) {
        var id;
        var match = url.match(/v\=([\d\w\-]+)/);
        if (match) {
            console.log(match);
            id = match[1];
        } else {
            return;
        }
        ytPlayer.loadVideoById(id, +seconds);
        ytPlayer.pauseVideo();
        currentURL = url;
        currentSeconds = seconds;
    },
    play: function () {
        ytPlayer.seekTo(+currentSeconds);
        ytPlayer.playVideo();
    },
    loopbackNow: function () {
        ytPlayer.seekTo(+currentSeconds);
    },
    onReady: function (fn) {
        readyCallbacks.push(fn);
    }
}

function runReadyCallbacks () {
    if (!ytPlayer.hasOwnProperty('loadVideoByUrl')) {
        console.log('deferring');
        return setTimeout(runReadyCallbacks, 200);
    }
    audioplayer.ready = true;
    if (!readyCallbacks.length) {
        return;
    }
    for (var i = 0; i < readyCallbacks.length; i++) {
        if (readyCallbacks[i] && typeof readyCallbacks[i] === 'function') {
            readyCallbacks[i]();
        }
    }
}
