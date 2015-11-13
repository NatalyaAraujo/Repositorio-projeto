var assert = require('assert')
  , tests
  , Grupo = geddy.model.Grupo;

tests = {

  'after': function (next) {
    // cleanup DB
    Grupo.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var grupo = Grupo.create({});
    grupo.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
