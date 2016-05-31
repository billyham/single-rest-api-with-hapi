var app = require('./lib/app');
app.byQuietLint = true;

const mongoose = require('./lib/setup-mongoose');
var connection = mongoose('mongodb://localhost/comicstrips');
connection.byQuietLint = true;
