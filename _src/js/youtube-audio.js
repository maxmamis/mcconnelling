var ytPlayer;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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

export function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('audioplayer', {
        height: '1px',
        width: '1px',
        playerVars: {
            autoplay: '1',
            controls: '0',
            modestbranding: '1',
            showinfo: '0',
            iv_load_policy: '3',
            rel: '0'
        }
    });
    runReadyCallbacks()
}

export function onPlayerReady(event) {
  runReadyCallbacks();
  event.target.playVideo();
}

var done = false;
export function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
    ytPlayer.stopVideo();
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
