var Permissaos = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Permissao.all(function(err, permissaos) {
      if (err) {
        throw err;
      }
      self.respond({permissaos: permissaos});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
     geddy.model.adapter.Entidade.all(function (err, entidades) {
      if (err) {
        throw err;
      }
      self.respond({params: params, 
        entidades: entidades,
        selectOpts: {
          name: 'entidadesId', 
          valueField: 'id', 
          textField: 'title'
        }});
    });
  };

  this.associar = function(req, resp, params){
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
          self.respond({permissaos: permissaos, entidades: entidades});
       });
    });
  };

  this.create = function (req, resp, params) {
    var self = this
      , permissao = geddy.model.Permissao.create(params);

    if (!permissao.isValid()) {
      this.respondWith(permissao);
    }
    else {
      geddy.model.adapter.Entidade.buscaEntidadePorId (params.entidadeId, function(err,entidade){
        geddy.log.info("... entidade encontrado " +entidade);  
        params.entidade = entidade;
      
        geddy.log.info("permissao entidade escolhido " +params.entidade);
        geddy.model.adapter.Permissao.criar(params, function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(permissao, {status: err});
        });
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Permissao.buscaPermissaoPorId(params.id, function(err, permissao) {
      if (err) {
        throw err;
      }
      if (!permissao) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(permissao);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Permissao.buscaPermissaoPorId(params.id, function(err, permissao) {
      if (err) {
        throw err;
      }
      if (!permissao) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.adapter.Entidade.all(function (err, entidades) {
          if (err) {
            throw err;
          }
          self.respond({permissao: permissao, entidades: entidades});
        });
      }
    });
  };

  this.update = function (req, resp, params) {
      var self = this;

    var cleanTodo = {
      id: params.id
    , nome: params.nome
    };
    
    var todo = geddy.model.Permissao.create(cleanTodo);
    if (!todo.isValid()) {
      self.respondWith(todo.errors, null);
    }
  
    geddy.model.adapter.Permissao.update(todo.id, cleanTodo, function(err, doc){
      if (err) {
         geddy.log.info("deu erro");
        throw err;
      }
      if (doc) {
        self.redirect({controller: 'Permissaos', action: 'index'});
      }
      else {
        geddy.log.info("else");
        geddy.model.adapter.Permissao.save(todo, function(err, docs){
          self.respondWith(docs, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Permissao.remover(params.id, function(err, permissao) {
      if (err) {
        throw err;
      }
      if (!permissao) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.log.info("remover terminado ");
        self.redirect({controller: 'Permissaos', action: 'index'});
      }
    });
  };

};

exports.Permissaos = Permissaos;
