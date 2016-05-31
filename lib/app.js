const hapi = require('hapi');
const server = new hapi.Server();

const httpStart = require('./http-start');
httpStart(server, 4444);


// server.connection({ port: 4444 });
// server.start( err => {
//   if (err) throw err;
//   console.log(`Server running at: ${server.info.uri}`);
// });


server.route({
  method: 'GET',
  path: '/comicstrips',
  handler: function (req, reply) {
    reply([{title: 'Calvin & Hobbes', author: 'Bill Watterson'}]).code(200);
  }
});

server.route({
  method: 'GET',
  path: '/comicstrips/{name}',
  handler: function (req, reply) {
    reply(`Hello, ${encodeURIComponent(req.params.name)}!`);
  }
});

server.route({
  method: 'POST',
  path: '/comicstrips',
  handler: function (req, reply) {
    console.log(req.payload);
    reply(req.payload);
  }
});

module.exports = server;
