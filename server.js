const mongoose = require('./lib/setup-mongoose');
var app = require('./lib/app');
app.byQuietLint = true;

var connection = mongoose('mongodb://localhost/comicstrips');
connection.byQuietLint = true;
