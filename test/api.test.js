const chai = require('chai');
const assert = chai.assert;
// const chaiHttp = require('chai-http');
const app = require('../lib/app');

// chai.use(chaiHttp);

const mongoose = require('../lib/setup-mongoose');
var connection = mongoose('mongodb://localhost/comicstrips');

var request;

const comicStrip1 = {
  title: 'Calvin & Hobbes',
  author: 'Bill Waterson',
  characters: ['Calvin', 'Hobbes', 'Wendy', 'Mom', 'Dad', 'Spaceman Spiff', 'Moe']
};
var comicStrip1ID = '';

// const comicStrip2 = {
//   title: 'Bloom County',
//   author: 'Berkeley Breathed',
//   characters: ['Opus', 'Milo', 'Binkley', 'Bill the Cat', 'Oliver Wendell Jones', 'Lola Granola', 'Portnoy']
// };
// var comicStrip2ID = '';

describe('End to End test', () => {

  // before( done => {
  //   request = chai.request(app);
  //   done();
  // });


  describe('POST methods', () => {

    it('test in with server inject', function () {
      app.inject({
        method: 'GET',
        url: '/comicstrips'
      }, function (res) {
        assert.equal(res.statusCode, 200);
      });
    });

    it('POST to /comicstrips returns a JSON object with _id field', done => {
      app.inject({
        method: 'POST',
        url: '/comicstrips',
        payload: comicStrip1
      }, function (res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.payload), '_id', 'has _id field');
        // Save the ID for a later test
        comicStrip1ID = JSON.parse(res.payload)['_id'];
        done();
      });
    });

  });

  describe('GET methods', () => {

    it.only('GET /comicstrips returns a JSON list of comicstrips', done => {
      app.inject({
        method: 'GET',
        url: '/comicstrips'
      }, function (res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.payload)[0], 'title', 'has required name field');
        assert.property(JSON.parse(res.payload)[0], 'author', 'has required number field');
        done();
      });
    });

    it('GET /comicstrips/<id> returns a complete JSON description of the skater', done => {
      request
      .get(`/comicstrips/${comicStrip1ID}`)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.text), 'title', 'has required name field');
        assert.property(JSON.parse(res.text), 'author', 'has required number field');
        assert.equal(JSON.parse(res.text).title, 'Calvin & Hobbes', 'title value input');
        done();
      });
    });

  });

  describe('PATCH methods', () => {

    comicStrip1['_id'] = '5748b710d2bbfc5e583e3812';

    it('PATCH /comicstrips/<id> returns a JSON object after updating skater document', done => {
      request
      .patch(`/comicstrips/${comicStrip1ID}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(comicStrip1))
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(JSON.parse(res.text)['_id'], comicStrip1['_id'], 'returned _id field matches given input');
        done();
      });
    });

  });

  describe('DELETE methods', () => {

    var comicToDelete = comicStrip1['_id'];

    it('DELETE /comicstrips/<id> returns a message after deleting a specified object', done => {
      request
      .delete(`/comicstrips/${comicToDelete}`)
      .end( (err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.text, `${comicStrip1.title} has been removed from the database.`);
        done();
      });
    });

  });

  after( () => {
    connection.close();
  });

});
