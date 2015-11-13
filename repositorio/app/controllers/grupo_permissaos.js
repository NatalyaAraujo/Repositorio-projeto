var GrupoPermissaos = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.GrupoPermissao.all(function(err, grupoPermissaos) {
      if (err) {
        throw err;
      }
      self.respondWith(grupoPermissaos, {type:'GrupoPermissao'});
    });
  };

  this.add = function (req, resp, params) {
     var self = this;
     geddy.model.Perfil.all(function (err, perfils) {
        if (err) {
          throw err;
        }
        geddy.model.Permissao.all(function (err, permissaos) {
          if (err) {
            throw err;
          }
          geddy.model.Entidade.all(function (err, entidades) {
          if (err) {
            throw err;
          }  

            self.respond({params: params, 
              perfils: perfils,
              permissaos: permissaos,
              entidades : entidades,
              selectOpts: {
                name: 'perfilsId', 
                valueField: 'id', 
                textField: 'title'
              }});
          });
        });
    });
    //this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , grupoPermissao = geddy.model.GrupoPermissao.create(params);

    if (!grupoPermissao.isValid()) {
      this.respondWith(grupoPermissao);
    }
    else {
      grupoPermissao.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(grupoPermissao, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.GrupoPermissao.first(params.id, function(err, grupoPermissao) {
      if (err) {
        throw err;
      }
      if (!grupoPermissao) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(grupoPermissao);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.GrupoPermissao.first(params.id, function(err, grupoPermissao) {
      if (err) {
        throw err;
      }
      if (!grupoPermissao) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(grupoPermissao);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.GrupoPermissao.first(params.id, function(err, grupoPermissao) {
      if (err) {
        throw err;
      }
      grupoPermissao.updateProperties(params);

      if (!grupoPermissao.isValid()) {
        self.respondWith(grupoPermissao);
      }
      else {
        grupoPermissao.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(grupoPermissao, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.GrupoPermissao.first(params.id, function(err, grupoPermissao) {
      if (err) {
        throw err;
      }
      if (!grupoPermissao) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.GrupoPermissao.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(grupoPermissao);
        });
      }
    });
  };

};

exports.GrupoPermissaos = GrupoPermissaos;
