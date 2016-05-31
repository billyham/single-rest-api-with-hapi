const Comicstrip = require('../model/comicstrip');
const httpStart = require('./http-start');
const hapi = require('hapi');
const server = new hapi.Server();

httpStart(server, 4444);


server.route({
  method: 'GET',
  path: '/comicstrips',
  handler: function (req, reply) {
    Comicstrip.find({}).select('title author characters')
      .then( comicstrips => {
        const response = reply(comicstrips).code(200);
        response.type('application/json');
      })
      .catch( () => {
        const response = reply({Error: 'Failed to perform the query'}).code(404);
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
      })
      .catch( () => {
        const response = reply({Error: 'Failed to find a matching ID'}).code(404);
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
        const response = reply(comicstrip).code(200);
        response.type('application/json');
      })
      .catch( () => {
        const response = reply({Error: 'Incomplete submission, title and author fields are required'}).code(404);
        response.type('application/json');
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
      reply({Error: 'Failed to submit changes'}).code(404);
    });
  }
});

server.route({
  method: 'DELETE',
  path: '/comicstrips/{id}',
  handler: function (req, reply) {
    Comicstrip.findOneAndRemove( {_id: req.params.id } )
      .then( comicstrip => {
        reply({Error: `${comicstrip.title} has been removed from the database.`});
      })
      .catch( () => {
        reply({Error: 'Failed to delete a comicstrip with the specified ID'}).code(404);
      });
  }
});


module.exports = server;
