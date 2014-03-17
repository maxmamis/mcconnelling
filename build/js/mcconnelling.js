(function () {
var MC = window.MC;
$(init);

MC.currentMcConnellId = null;

function init () {
	MC.currentMcConnellId = getIdFromURL();
	if (MC.currentMcConnellId) {
		$('body').addClass('player_showing');
		$('#solo-share').on('click', function () {
			MC.showShareDialog();
		});
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
	$('#get-started').on('click', function () {
		$('body').addClass('player_showing').addClass('editor_showing');
	});
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

var fbTemplate = '<a href="https://www.facebook.com/sharer/sharer.php?u={$URL}" target="_blank">Share on Facebook</a>';
var twTemplate =  '<a href="https://twitter.com/share?url={$URL}" target="_blank">Share on Twitter</a>';

MC.showShareDialog = function () {
	var url = MC.getShareURL();
    $('#share-link').val(url);
    var encodedUrl = encodeURIComponent(url);
    var fb = fbTemplate.replace('{$URL}', encodedUrl);
    var tw = twTemplate.replace('{$URL}', encodedUrl);
    var $fbshare = $(fb);
    var $twshare = $(tw);
    $('.facebook').empty();
    $('.twitter').empty();
    $('.facebook').append($fbshare);
    $('.twitter').append($twshare);
    $('#share').show();

    $('#share #close, .backdrop').on('click', function () {
    	$('#share').hide();
    	$('#share #close, .backdrop').off('click');
    });
}



MC.getShareURL = function () {
	return 'http://www.mcconnelling.org?_id=' + MC.currentMcConnellId;
};

function displayError() {}

}());