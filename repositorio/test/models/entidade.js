var assert = require('assert')
  , tests
  , Entidade = geddy.model.Entidade;

tests = {

  'after': function (next) {
    // cleanup DB
    Entidade.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var entidade = Entidade.create({});
    entidade.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
