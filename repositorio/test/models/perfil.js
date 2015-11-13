var assert = require('assert')
  , tests
  , Perfil = geddy.model.Perfil;

tests = {

  'after': function (next) {
    // cleanup DB
    Perfil.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var perfil = Perfil.create({});
    perfil.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
