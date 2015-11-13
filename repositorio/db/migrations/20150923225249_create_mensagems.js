var CreateMensagems = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('texto', 'string');
          t.column('dtEnvio', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('mensagem', def, callback);
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
    this.dropTable('mensagem', callback);
  };
};

exports.CreateMensagems = CreateMensagems;
