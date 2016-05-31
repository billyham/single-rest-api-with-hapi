const app = require('./lib/app');
const mongoose = require('./lib/setup-mongoose');

var connection = mongoose('mongodb://localhost/comicstrips');
