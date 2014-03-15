var express = require('express'),
    config  = require('./config');

var app = express();
app.use(express.static(__dirname +'/public'));

// TODO: make this work
function findMcconnell (id, callback) {
	process.nextTick(function () {
		callback(null, {mcconnell: 'turtle'});
	});
}
function saveMcconnell (id) {}

app.get('/mcconnell', function (req, res) {
	findMcconnell(req.param('id'), function (err, mcconnell) {
		if (err) {
			return res.err(err);
		}

		res.send(mcconnell);
	});
});

app.post('/mcconnell', function (req, res) {
	saveMcconnell(req.param('mcconnell'));
});

app.listen(config.port);
console.log('Now Mcconnelling on port ' + config.port);