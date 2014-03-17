(function () {
var MC = window.MC;
$(init);

MC.currentMcConnellId = null;

function init () {
	MC.currentMcConnellId = getIdFromURL();
	if (MC.currentMcConnellId) {
		$('body').addClass('player_showing');
		loadMcConnellFromID(MC.currentMcConnellId);
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
	// $('body').removeClass('player_showing');
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

MC.getShareURL = function () {
	return 'http://www.mcconnelling.org?_id=' + MC.currentMcConnellId;
};

function displayError() {}

}());