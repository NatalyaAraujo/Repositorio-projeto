var CreateAtividadeResposta = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('data', 'datetime');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('atividade_resposta', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('atividade_resposta', callback);
  };
};

exports.CreateAtividadeResposta = CreateAtividadeResposta;
