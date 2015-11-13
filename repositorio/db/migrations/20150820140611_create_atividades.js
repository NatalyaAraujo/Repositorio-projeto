var CreateAtividades = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('descricao', 'string');
          t.column('titulo', 'string');
          t.column('dataInicio', 'datetime');
          t.column('dataFim', 'datetime');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('atividade', def, callback);
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
    this.dropTable('atividade', callback);
  };
};

exports.CreateAtividades = CreateAtividades;
