import $ from 'jquery';
import {mcconnelling} from './js/mcconnelling.js';

$(()=> {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    mcconnelling.init();
});

function onYouTubeIframeAPIReady() {
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
    runReadyCallbacks();
}

function onPlayerReady(event) {
  runReadyCallbacks();
  event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(ytPlayer.stopVideo(), 6000);
    done = true;
  }
}
