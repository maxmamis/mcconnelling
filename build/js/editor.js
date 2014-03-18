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
        $('.instructions').remove();
        toggleTimelineClip($(this).data('clip'));
        playNewSequence();
    });

    $('.timeline-clip .close').on('click', function () {
        console.log("closed");
        $(this).parent().toggleClass('active');
        playNewSequence();
    });

    $('#save').on('click', function () {
        editor.save(function (url) {
            MC.showShareDialog();
        });
    });

    $('#update').on('click', function () {
        playNewSequence();
        $('#video-share').show();
        window.scrollTo(0, 0);
    });

    $('.audio').on('change', function () {
        playNewSequence();
    });
};

editor.save = function (callback) {
    MC.networkManager.saveMcConnell(serializeMcConnell(), function (err, data) {
        MC.currentMcConnellId = data._id;
        callback(data._id);
    });
};

function serializeMcConnell () {
    var clips = getClipOrder();
    var sound = getSound();
    return {
        clips: clips,
        sound: sound,
        name: $('#title').val()
    };
}

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

function getSound () {
    return {
        url: $('#audio-url').val(),
        start: $('#audio-start').val()
    };
}

function playNewSequence() {
    console.log(serializeMcConnell());
    MC.player.load(serializeMcConnell());
    MC.player.play();
}


}());