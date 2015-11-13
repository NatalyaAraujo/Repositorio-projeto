var Turmas = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;
    var usu = self.session.get('usuario');
    geddy.model.adapter.Turma.all(function(err, turmas) {
      if (err) {
        throw err;
      }
      self.respondWith(turmas, {type:'Turma'});
    });
  };

  this.add = function (req, resp, params) {
   var self = this;
    geddy.model.adapter.Usuario.all(function (err, usuarios) {
      if (err) {
        throw err;
      }
      self.respond({turma: params, 
        usuarios: usuarios,
        selectOpts: {
          name: 'usuariosId', 
          valueField: 'id', 
          textField: 'title'
        }});
    });
  };

  this.create = function (req, resp, params) {
 //   geddy.log.info(" o params "+params.usuarioId);
    var self = this
      , turma = geddy.model.Turma.create(params);
    if (!turma.isValid()) {
      this.respondWith(turma);
    }
    else {
      geddy.log.info(" o params "+params.usuarioId+" "+ typeof params.usuarioId);
      params.alunos = [];
      
      var array = params.usuarioId.split(",");
      geddy.log.info(" o array ficou assim: "+array);
      array.forEach(function(usuId){
        geddy.log.info(" aluno escolhido "+usuId);
        var alu = {
          id : usuId
        };
        params.alunos.push(alu);
        
      });
      delete params.usuarioId;
      geddy.model.adapter.Turma.criar(params, function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(turma, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;
    geddy.log.info("show... turmas " +params.id);
    //show turma   list atividades
    
    /*geddy.model.adapter.Turma.findTurmaById(params.id, function(err, turma) {
      if (err) {
        throw err;
      }
      if (!turma) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respond({turma: turma});
      }
    });*/
   // params.turmaid = params.id;
    self.redirect({controller: 'Atividades', action: 'index', params: params, req: 'req', resp: 'resp'});

  };

  this.edit = function (req, resp, params) {
    var self = this;
    geddy.model.adapter.Turma.findTurmaById(params.id, function(err, turma) {
      geddy.log.info("antes... ");
      if (err) {
        geddy.log.info("deu erro no turmas ");
        throw err;
      }
      if (!turma) {
        geddy.log.info("bad request no turmas ");
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.log.info("antes do usu all ");
         geddy.model.adapter.Usuario.all(function (err, usuarios) {
          if (err) {
            throw err;
          }
          geddy.log.info("usus ");
          self.respond({turma: turma, usuarios: usuarios});
        });
      }
    });
  };

  this.update = function (req, resp, params) {
   var self = this;

   params.alunos = [];
      
    var array = params.usuarioId.split(",");
    geddy.log.info(" o array ficou assim: "+array);
    array.forEach(function(usuId){
      geddy.log.info(" aluno escolhido "+usuId);
      var alu = {
        id : usuId
      };
      params.alunos.push(alu);
        
    });
    delete params.usuarioId;

    var cleanTodo = {
      id: params.id
    , nome: params.nome
    , alunos: params.alunos
    , professor: params.professor
   // , atividades: params.atividade
    };
    
    var todo = geddy.model.Turma.create(cleanTodo);
    if (!todo.isValid()) {
      self.respondWith(todo.errors, null);
    }
  
    geddy.model.adapter.Turma.update(todo.id, cleanTodo, function(err, doc){
      if (err) {
         geddy.log.info("deu erro");
        throw err;
      }
      if (doc) {
        self.redirect({controller: 'Turmas', action: 'index'});
      }
      else {
        geddy.log.info("else");
        geddy.model.adapter.Turma.save(todo, function(err, docs){
          self.respondWith(docs, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;
    geddy.model.adapter.Turma.remover(params.id, function(err, turma) {
      if (err) {
        throw err;
      }
      if (!turma) {
        throw new geddy.errors.BadRequestError();
      }
      else {
         geddy.log.info("remover terminado ");
         self.redirect({controller: 'Turmas', action: 'index'});
      }
    });
  };

};

exports.Turmas = Turmas;
