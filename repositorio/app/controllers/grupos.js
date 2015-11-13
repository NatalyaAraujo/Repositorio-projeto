var Grupos = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;
    geddy.log.info('cheguei aki');
    geddy.model.Grupo.all(function(err, grupos) {
      if (err) {
        throw err;
      }
      self.respondWith(grupos, {type:'Grupo'});
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
            entidades: entidades,
            selectOpts: {
              name: 'perfilId', 
              valueField: 'id', 
              textField: 'title'
            }});
        });
      });
    });
  };

  this.create = function (req, resp, params) {
    var self = this
      , grupo = geddy.model.Grupo.create(params);

    if (!grupo.isValid()) {
      this.respondWith(grupo);
    }
    else {
      grupo.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(grupo, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Grupo.first(params.id, function(err, grupo) {
      if (err) {
        throw err;
      }
      if (!grupo) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(grupo);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Grupo.first(params.id, function(err, grupo) {
      if (err) {
        throw err;
      }
      if (!grupo) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(grupo);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Grupo.first(params.id, function(err, grupo) {
      if (err) {
        throw err;
      }
      grupo.updateProperties(params);

      if (!grupo.isValid()) {
        self.respondWith(grupo);
      }
      else {
        grupo.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(grupo, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Grupo.first(params.id, function(err, grupo) {
      if (err) {
        throw err;
      }
      if (!grupo) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Grupo.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(grupo);
        });
      }
    });
  };

};

exports.Grupos = Grupos;
