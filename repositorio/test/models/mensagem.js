var assert = require('assert')
  , tests
  , Mensagem = geddy.model.Mensagem;

tests = {

  'after': function (next) {
    // cleanup DB
    Mensagem.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var mensagem = Mensagem.create({});
    mensagem.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
