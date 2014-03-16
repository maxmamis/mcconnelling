(function () {

function getClipOrder() {
    var clips = [];
    $( ".timeline li.active" ).each(function() {
        clips.push( $(this).data("clip") );
    });
    return clips;
}

function playNewSequence() {
    console.log( " ");
    console.log("clips " , getClipOrder());
    MC.player.load( {
        clips: getClipOrder()
    });
}

$('#sortable').on( "sortstop", function( event, ui ) {
    playNewSequence();
});

}());