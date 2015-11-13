var CreateEntidades = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('nome', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('entidade', def, callback);
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
    this.dropTable('entidade', callback);
  };
};

exports.CreateEntidades = CreateEntidades;
