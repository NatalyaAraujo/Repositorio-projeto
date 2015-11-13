var Perfils = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Perfil.all(function(err, perfils) {
      if (err) {
        throw err;
      }
      self.respondWith(perfils, {type:'Perfil'});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
      geddy.model.adapter.Permissao.all( function(err, permissaos) {
        if (err) {
          throw err;
        }
        geddy.log.info("passei por aki permissoes "+permissaos);
        geddy.model.adapter.Entidade.all( function( err, entidades) {
            geddy.log.info("passei por aki entidade "+entidades);
            if(err){
              throw err;
            }
            self.respond({params: params, permissaos: permissaos, entidades: entidades});
      });
    });

    //this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , perfil = geddy.model.Perfil.create(params);

    if (!perfil.isValid()) {
      this.respondWith(perfil);
    }
    else {
      params.permissoes = [];
      geddy.model.adapter.Permissao.all(function(err, permissaos){
        if (err) {
          throw err;
        }
        params.permissaoId.forEach(function(permId){
          var p;
          geddy.log.info(" permissao escolhida "+permId+" "+permissaos[0]._id);
          for (var u = 0; u < permissaos.length; u++) {
              if(permissaos[u]._id == permId){
                geddy.log.info("...comparando..."+permId+" "+permissaos[u]);
                p = permissaos[u];
              }
          }
          geddy.log.info(" permissao escolhida "+p.nome+" "+p.entidade);
            var perm = {
              id : permId,
              nome : p.nome,
              entidade: p.entidade
            };
            params.permissoes.push(perm);
          });

          geddy.log.info("No final o params ficou assim: "+params.permissoes+" "+params.permissoes[0]+" "+params.permissoes.length);

          geddy.model.adapter.Perfil.criar(params, function(err, data) {
            if (err) {
              throw err;
            }
            self.respondWith(perfil, {status: err});
        });
      });
    }
  };

  this.associar = function(req, resp, params){
    var self = this;

    geddy.model.adapter.Perfil.all(function(err, perfils) {
      if (err) {
        throw err;
      }

      geddy.model.adapter.Permissao.all( function(err, permissaos) {
        if (err) {
          throw err;
        }
        geddy.log.info("passei por aki permissoes "+permissaos);
        geddy.model.adapter.Entidade.all( function( err, entidades) {
            geddy.log.info("passei por aki entidade "+entidades);
            if(err){
              throw err;
            }
            self.respond({permissaos: permissaos, entidades: entidades, perfils: perfils});
         });
      });
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Perfil.findPerfilById(params.id, function(err, perfil) {
      if (err) {
        throw err;
      }
      if (!perfil) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(perfil);
      }
    });
  };

  this.edit = function (req, resp, params) {
     var self = this;

    geddy.model.adapter.Perfil.findPerfilById(params.id, function(err, perfil) {
      if (err) {
        throw err;
      }

      geddy.model.adapter.Permissao.all( function(err, permissaos) {
        if (err) {
          throw err;
        }
        geddy.log.info("passei por aki permissoes "+permissaos);
        geddy.model.adapter.Entidade.all( function( err, entidades) {
            geddy.log.info("passei por aki entidade "+entidades);
            if(err){
              throw err;
            }
            self.respond({permissaos: permissaos, entidades: entidades, perfil: perfil});
         });
      });
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    var cleanTodo = {
      id: params.id
    , nome: params.nome
    };

    geddy.log.info("as permissoes escolhidas foram " + params.permissaoId);
    
    var todo = geddy.model.Perfil.create(cleanTodo);
    if (!todo.isValid()) {
      self.respondWith(todo.errors, null);
    }
    
    cleanTodo.permissoes = [];
    params.permissaoId.forEach(function(permId){
        geddy.log.info(" permissao escolhida "+permId);
         geddy.model.adapter.Permissao.buscaPermissaoPorId(permId,function(err, permissao){
          if (err) {
            throw err;
          }

          var perm = {
            id : permId,
            nome : permissao.nome,
            entidade: permissao.entidade
          };
          cleanTodo.permissoes.push(perm);
        });
      });
      geddy.log.info("No final o cleanTodo ficou assim: "+cleanTodo);

    geddy.model.adapter.Perfil.update(todo.id, cleanTodo, function(err, doc){
      if (err) {
         geddy.log.info("deu erro");
        throw err;
      }
      if (doc) {
        self.redirect({controller: 'Perfils', action: 'index'});
      }
      else {
        geddy.log.info("else");
        geddy.model.adapter.Perfil.save(todo, function(err, docs){
          self.respondWith(docs, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
   var self = this;

    geddy.log.info("remover... "+params.id);

    geddy.model.adapter.Perfil.remover(params.id, function(err, perfil) {
      geddy.log.info("remover perfil de id: "+perfil);
      if (err) {
        throw err;
      }
      if (!perfil) {
        throw new geddy.errors.BadRequestError();
      }
      else {
       // geddy.model.Usuario.remove(params.id, function(err) {
       //   if (err) {
       //     throw err;
       //   }
          geddy.log.info("remover terminado ");
          self.redirect({controller: 'Perfils', action: 'index'});
       // });
      }
    });
  };

};

exports.Perfils = Perfils;
