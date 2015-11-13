var CreatePermissaos = function () {
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
    this.createTable('permissao', def, callback);
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
    this.dropTable('permissao', callback);
  };
};

exports.CreatePermissaos = CreatePermissaos;
