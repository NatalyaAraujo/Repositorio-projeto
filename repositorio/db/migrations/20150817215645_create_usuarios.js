var CreateUsuarios = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('nome', 'string');
          t.column('login', 'string');
          t.column('senha', 'string');
          t.column('email', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('usuario', def, callback);
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
    this.dropTable('usuario', callback);
  };
};

exports.CreateUsuarios = CreateUsuarios;
