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

    $('#save').on('click', function () {
        editor.save(function () {
            alert(MC.getShareURL());
        }); 
    });

    $('.audio').on('change', function () {
        console.log('changed');
        playNewSequence();
    });
};

editor.save = function (callback) {
    MC.networkManager.saveMcConnell(serializeMcConnell(), function (err, data) {
        console.log(data);
        MC.currentMcConnellId = data._id;
        callback();
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