const hapi = require('hapi');
const server = new hapi.Server();
const Comicstrip = require('../model/comicstrip');

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
    Comicstrip.find({}).select('title author characters')
      .then( comicstrips => {
        const response = reply(comicstrips).code(200);
        response.type('application/json');
      });
  }
});

server.route({
  method: 'GET',
  path: '/comicstrips/{id}',
  handler: function (req, reply) {
    Comicstrip.findOne( {_id: req.params.id } )
      .then( comicstrips => {
        const response = reply(comicstrips).code(200);
        response.type('application/json');
      });
  }
});

server.route({
  method: 'POST',
  path: '/comicstrips',
  handler: function (req, reply) {
    new Comicstrip(req.payload)
      .save()
      .then( comicstrip => {
        reply(comicstrip).code(200);
        // response.type('application/json');
      })
      .catch( () => {
        reply('Failed to post comicstrip');
      });
  }
});

server.route({
  method: 'PATCH',
  path: '/comicstrips/{id}',
  handler: function (req, reply) {
    Comicstrip.findOneAndUpdate( {_id: req.params.id}, req.payload, {new: true} )
    .then( comicstrip => {
      reply(comicstrip).code(200);
    })
    .catch( () => {
      reply('Failed to post comicstrip');
    });
  }
});

server.route({
  method: 'DELETE',
  path: '/comicstrips/{id}',
  handler: function (req, reply) {
    Comicstrip.findOneAndRemove( {_id: req.params.id } )
      .then( comicstrip => {
        reply(`${comicstrip.title} has been removed from the database.`);
      })
      .catch( () => {
        reply('Failed to find a matching comicstrip ID');
      });
  }
});


module.exports = server;
