(function () {

var MC = window.MC = (window.MC || {});
var editor = MC.editor = {};

editor.init = function () {
    $("#sortable").sortable({
        revert: true
    });

    $('#sortable').on( "sortstop", function( event, ui ) {
        playNewSequence();
    });

    $('.gallery-clip').on('click', function () {
        toggleTimelineClip($(this).data('clip'));
        playNewSequence();
    });
};

function toggleTimelineClip (clip) {
    $('.timeline-clip[data-clip=' + clip + ']').toggleClass('active');
}

function getClipOrder() {
    var clips = [];
    $( ".timeline li.active" ).each(function() {
        clips.push( $(this).data("clip") );
    });
    return clips;
}

function playNewSequence() {
    MC.player.load( {
        clips: getClipOrder()
    });
}

}());