var assert = require('assert')
  , tests
  , Permissao = geddy.model.Permissao;

tests = {

  'after': function (next) {
    // cleanup DB
    Permissao.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var permissao = Permissao.create({});
    permissao.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
