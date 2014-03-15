(function () {
var MC = window.MC;

var testMcconnell = {
	clips: ['1', '2', '3']
};

$(function () {
	$('body').addClass('player_showing');
	MC.player.load(testMcconnell);
	MC.player.play();
});

}());