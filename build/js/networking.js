(function () {
var MC = window.MC = (window.MC || {});
var networkManager = MC.networkManager = {};

networkManager.getMcConnell = function (id, callback) {
	var jqXHR = $.get('/mcconnells/' + id, function (data) {
		return callback(null, data);
	});

	jqXHR.fail(function () {
		return callback(true);
	});
};

networkManager.saveMcConnell = function (mcconnell, callback) {
	var data = JSON.stringify(mcconnell);
	$.post('/mcconnells', data, function (data) {
		return callback(null, data);
	});
};

}());