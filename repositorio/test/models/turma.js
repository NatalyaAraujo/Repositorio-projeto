var assert = require('assert')
  , tests
  , Turma = geddy.model.Turma;

tests = {

  'after': function (next) {
    // cleanup DB
    Turma.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var turma = Turma.create({});
    turma.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
