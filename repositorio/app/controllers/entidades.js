var Entidades = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Entidade.all(function(err, entidades) {
      if (err) {
        throw err;
      }
      //geddy.log.info("Chegou do all: "+entidades);
      self.respondWith(entidades, {type:'Entidade'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , entidade = geddy.model.Entidade.create(params);

    if (!entidade.isValid()) {
      this.respondWith(entidade);
    }
    else {
      geddy.model.adapter.Entidade.criar(params, function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(entidade, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Entidade.buscaEntidadePorId(params.id, function(err, entidade) {
      if (err) {
        throw err;
      }
      if (!entidade) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(entidade);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Entidade.buscaEntidadePorId(params.id, function(err, entidade) {
      if (err) {
        throw err;
      }
      if (!entidade) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respond({entidade: entidade});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    var novaEnt = {
      id: params.id
    , nome: params.nome
    };
    
    var entidade = geddy.model.Entidade.create(novaEnt);
    if (!entidade.isValid()) {
      self.respondWith(entidade.errors, null);
    }
  
    geddy.model.adapter.Entidade.update(entidade.id, novaEnt, function(err, doc){
      if (err) {
         geddy.log.info("deu erro");
        throw err;
      }
      if (doc) {
        self.redirect({controller: 'Entidades', action: 'index'});
      }
      else {
        geddy.log.info("else");
        geddy.model.adapter.Entidade.save(entidade, function(err, docs){
          self.respondWith(docs, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Entidade.remover(params.id, function(err, entidade) {
      if (err) {
        throw err;
      }
      if (!entidade) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.log.info("remover terminado ");
          self.redirect({controller: 'Entidades', action: 'index'});
      }
    });
  };

};

exports.Entidades = Entidades;
