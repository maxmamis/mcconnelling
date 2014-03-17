(function () {
var MC = window.MC = (window.MC || {});
var audioplayer = MC.audioplayer = {};
// the Youtube player
var ytPlayer;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
// tag.id = 'ytplayer';
tag.src = "https://www.youtube.com/iframe_api";
// tag.src = 'http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=ytplayer';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('audioplayer', {
        height: '1px',
        width: '1px',
        // videoId: 'R1QRTHHlJ-I',
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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  runReadyCallbacks();
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
    ytPlayer.stopVideo();
}

// currentSeconds is the start time of the current video
var currentURL, currentSeconds;
audioplayer.loadWithUrlAndSeconds = function (url, seconds) {
    var id;
    var match = url.match(/v\=([\d\w]+)/);
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
};

audioplayer.play = function () {
    ytPlayer.seekTo(+currentSeconds);
    ytPlayer.playVideo();
}

audioplayer.loopbackNow = function () {
    ytPlayer.seekTo(+currentSeconds);
};

audioplayer.ready = false;
var readyCallbacks = []
audioplayer.onReady = function (fn) {
    readyCallbacks.push(fn);
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


// export Youtube player events
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.onPlayerReady = onPlayerReady;
window.onPlayerStateChange = onPlayerStateChange;

}());