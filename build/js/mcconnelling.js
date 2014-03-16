(function () {
var MC = window.MC;
$(init);

function init () {
	var currentID = getIdFromURL();
	if (currentID) {
		$('body').addClass('player_showing');
		loadMcConnellFromID(currentID);
	} else {
		welcome();
	}
	MC.editor.init();
	MC.player.init();
}

function getIdFromURL () {
	var search = window.location.search;
	var match = search.match(/_id=([\d\w]+)/);
	if (match) {
		return match[1];
	} else {
		return null;
	}
}

function welcome () {
	// initialize the welcome screen
}

function loadMcConnellFromID (id) {
	MC.networkManager.getMcConnell(id, function (err, mcconnell) {
		if (err) {
			return displayError();
		}

		MC.player.load(mcconnell);
		MC.player.play();
	});
}

function displayError() {}

}());