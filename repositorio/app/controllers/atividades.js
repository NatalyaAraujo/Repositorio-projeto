var Atividades = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;
    var usuario = self.session.get('usuario');//{usuarioId: usuario.id},
    geddy.log.info(" turmaid "+params.turmaid+" "+params.id);
    
    if(params.turmaid){
      geddy.log.info("no atv index chegou o turmaid "+params.turmaid);
    }
    geddy.model.adapter.Atividade.buscaAtividadePorTurma(params.turmaid, function(err, atividades) {
      if (err) {
        throw err;
      }
      geddy.log.info(atividades);
      self.respond({atividades: atividades});
    });
  };

  this.add = function (req, resp, params) {
    if(params.turmaid){
      geddy.log.info("o id q chegou foi "+params.turmaId);
    }

    this.respond({params: params, turmaId: params.turmaId});
  };

  this.create = function (req, resp, params) {
    var data = new Date();
    params.dataCriacao = data.toLocaleString();

    var self = this
      , atividade = geddy.model.Atividade.create(params);
   
    var usuario = self.session.get('usuario');

    geddy.log.info("o create "+usuario.login);
    params.criador = {
      _id : usuario._id,
      email : usuario.email,
      login : usuario.login
    };

    var ObjectID = require('mongodb').ObjectID; 
    var o_id = new ObjectID(params.turmaId);
    params.turma = {
      _id : o_id
    };
    delete params.turmaId;
    
    geddy.log.info("o create antes do if ");  
    if (!atividade.isValid()) {
      this.respondWith(atividade);
    }
    else {
      geddy.model.adapter.Atividade.criar(params, function(err, data) {
        if (err) {
          throw err;
        }
        geddy.log.info("atividade salva "+data);
        geddy.log.info("o id da turma eh "+params.turmaId);
        self.respondWith(atividade, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Atividade.first(params.id, function(err, atividade) {
      if (err) {
        throw err;
      }
      if (!atividade) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(atividade);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Atividade.buscaAtividadePorId(params.id, function(err, atividade) {
      if (err) {
        throw err;
      }
      if (!atividade) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respond({atividade: atividade, turmaId: atividade.turma._id});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    var atv = {
      id:  params.id,
      titulo: params.titulo,
      descricao: params.descricao,
      dataInicio: params.dataInicio,
      dataFim:  params.dataFim
    };
    
    var todo = geddy.model.Atividade.create(atv);
    if (!todo.isValid()) {
      self.respondWith(todo.errors, null);
    }
    geddy.model.adapter.Atividade.update(todo.id, atv, function(err, doc){
      if (err) {
        throw err;
      }
      if (doc) {
        self.redirect({controller: 'Atividades', action: 'index'});
      }
      else {
        geddy.model.adapter.Atividade.save(todo, function(err, docs){
          self.respondWith(docs, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;
    
    geddy.log.info("remover... "+params.id);

    geddy.model.adapter.Atividade.remover(params.id, function(err, atv) {
      geddy.log.info("remover atv de id: "+atv);
      if (err) {
        throw err;
      }
      if (!atv) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.log.info("remover terminado ");
        self.redirect({controller: 'Atividades', action: 'index'});
      }
    });
  };

};

exports.Atividades = Atividades;
