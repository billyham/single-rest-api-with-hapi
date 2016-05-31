const Comicstrip = require('../model/comicstrip');

describe('Comicstrip', () => {

  it('Validation requires title', done => {
    const ComicstripItem1 = new Comicstrip({
      author: 'Cathy'  // Missing title, validation will fail
    });

    ComicstripItem1.validate( err => {
      if (!err) done('Failed to validate missing name');
      else done();
    });
  });

  it('Validation requires author', done => {
    const ComicstripItem2 = new Comicstrip({
      title: 'Doonesbury'  // Missing author, validation will fail
    });

    ComicstripItem2.validate( err => {
      if (!err) done('Failed to validate missing number');
      else done();
    });
  });

});
