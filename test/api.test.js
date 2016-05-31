const chai = require('chai');
const assert = chai.assert;
const app = require('../lib/app');

const mongoose = require('../lib/setup-mongoose');
var connection = mongoose('mongodb://localhost/comicstrips');

const comicStrip1 = {
  title: 'Calvin and Hobbes',
  author: 'Bill Waterson',
  characters: ['Calvin', 'Hobbes', 'Wendy', 'Mom', 'Dad', 'Spaceman Spiff', 'Moe']
};
var comicStrip1ID = '';

const comicStrip2 = {
  title: 'Bloom County',
  author: 'Berkeley Breathed',
  characters: ['Opus', 'Milo', 'Binkley', 'Bill the Cat', 'Oliver Wendell Jones', 'Lola Granola', 'Portnoy']
};
var comicStrip2ID = '';

describe('End to End test', () => {

  before( done => {
    app.inject({
      method: 'POST',
      url: '/comicstrips',
      payload: comicStrip1
    }, function (res) {
      // Save the ID for a later test
      comicStrip1ID = JSON.parse(res.payload)['_id'];
      done();
    });
  });

  describe('POST methods', () => {

    it('POST to /comicstrips returns a JSON object with _id field', done => {
      app.inject({
        method: 'POST',
        url: '/comicstrips',
        payload: comicStrip2
      }, function (res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.payload), '_id', 'has _id field');
        // Save the ID for a later test
        comicStrip2ID = JSON.parse(res.payload)['_id'];
        done();
      });
    });

  });

  describe('GET methods', () => {

    it('GET /comicstrips returns a JSON list of comicstrips', done => {
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
      app.inject({
        method: 'GET',
        url: `/comicstrips/${comicStrip2ID}`
      }, function (res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.property(JSON.parse(res.payload), 'title', 'has required name field');
        assert.property(JSON.parse(res.payload), 'author', 'has required number field');
        assert.equal(JSON.parse(res.payload).title, 'Bloom County', 'title value input');
        done();
      });

    });
  });

  describe('PATCH methods', () => {

    comicStrip1.title = 'Peanuts';
    it('PATCH /comicstrips/<id> returns a JSON object after updating skater document', done => {
      app.inject({
        method: 'PATCH',
        url: `/comicstrips/${comicStrip1ID}`,
        payload: comicStrip1
      }, function (res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
        assert.equal(JSON.parse(res.payload)['_id'], comicStrip1ID, 'returned _id field matches given input');
        assert.equal(JSON.parse(res.payload).title, 'Peanuts', 'title value input');
        done();
      });

    });

  });

  describe('DELETE methods', () => {

    it('DELETE /comicstrips/<id> returns a message after deleting a specified object', done => {
      app.inject({
        method: 'DELETE',
        url: `/comicstrips/${comicStrip2ID}`
      }, function (res) {
        assert.equal(res.statusCode, 200);
        assert.equal(JSON.parse(res.payload).Error, `${comicStrip2.title} has been removed from the database.`);
        done();
      });

    });

  });

  after( () => {
    connection.close();
  });

});
