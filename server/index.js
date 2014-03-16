var express = require('express'),
    config  = require('./config'),
    db      = require('./db'),
    _       = require('underscore');

var app = express();
app.use(express.static(__dirname + '/../app'));
app.use(express.json());

function findMcconnell (id, callback) {
    db.collection('mcconnells').findOne({_id: id}, callback);
}

function saveMcconnell (mcconnell, callback) {
    db.collection('mcconnells').insert(mcconnell, callback);
}

function incProperty (mcconnell, property) {
    var id = mcconnell._id;
    if (!id.hasOwnProperty('_bsontype')) {
        id = mongo.ObjectID(id);
    }
    var update = {'$inc': {}};
    update['$inc'][property] = 1;
    db.collection('mcconnells').update({
        _id: id
    }, update, function () {});

}

function incViewCount (mcconnell) {
    incProperty(mcconnell, 'views');
}

function incShareCount (mcconnell) {
    incProperty(mcconnell, 'shares');
}

app.get('/mcconnells/:id', function (req, res) {
    var id = req.param('id');
    findMcconnell(new db.ObjectId(id), function (err, mcconnell) {
        if (err) {
            console.error(err);
            return res.send(500, {error: 'something went wrong'});
        }

        if (_.isEmpty(mcconnell)) {
            return res.send(404, {error: 'McConnell not found'});
        }

        res.send(mcconnell);
        incViewCount(mcconnell);
    });
});

app.post('/mcconnells/:id/share', function (req, res) {
    incShareCount(req.body);
    res.send({});
});

app.post('/mcconnells', function (req, res) {
    var body = req.body;
    var mcconnell = {
        clips: body.clips,
        title: body.name,
        sound: body.sound,
        user:  body.user,
        shares: 0,
        views: 0
    };

    saveMcconnell(mcconnell, function (err, doc) {
        if (err) {
            console.error(err);
            return res.send(500, {error: 'something went wrong'});
        }

        res.send(doc);
    });
});

app.listen(config.port);
console.log('Now Mcconnelling on port ' + config.port);