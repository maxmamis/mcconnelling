'use strict';

var fs              = require('fs'),
    path            = require('path'),
    tasks           = fs.readdirSync('./gulp/tasks/').filter(task => /(\.(js)$)/i.test(path.extname(task)));

tasks.forEach(function(task) {
    require('./tasks/' + task);
});
