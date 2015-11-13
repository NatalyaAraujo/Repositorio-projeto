var passport = require('passport'); 
//var passport = require('../../lib/passport/autenticar');

var Usuarios = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Usuario.all(function(err, usuarios) {
      if (err) {
        throw err;
      }
      geddy.model.adapter.Perfil.all(function (err, perfils) {
          if (err) {
            throw err;
          }
          geddy.log.info("no all " +usuarios+" "+perfils);
        self.respond({ usuarios: usuarios, perfils: perfils});
       });
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
     geddy.model.adapter.Perfil.all(function (err, perfils) {
      if (err) {
        throw err;
      }
      self.respond({params: params, 
        perfils: perfils,
        selectOpts: {
          name: 'perfilId', 
          valueField: 'id', 
          textField: 'title'
        }});
    });
  };

  this.logado = function(req, resp, params){
    var usuario = this.session.get('usuario');
    geddy.log.info("autenticado... "+usuario);
   // usuario.login = '';
    usuario.senha = '';
    this.respond(usuario, {format: 'json'});
  };

   this.autenticar = function(req, resp, params){
    var self = this;
    geddy.log.info("autenticando... ");

   /*passport.authenticate('local', {
    successRedirect: '/atividades/index',
    failureRedirect: '/',
    failureFlash : true
  })(req, resp, this.next);*/

    geddy.model.adapter.Usuario.buscaUsuarioPorLoginSenha({login: params.login, senha: params.senha}, function(err,usuario){
      if (err) {
        throw err;
      }
      if (!usuario) {
        self.flash.error('Usuário não cadastrado!');
        self.redirect({controller: 'Main', action: 'login'});
      }
      else {
        geddy.log.info("Usuário logado ");
        self.session.set('usuario', usuario);
        self.redirect({controller: 'Main', action: 'index'});
      }
     });
  };

  this.create = function (req, resp, params) {
    var self = this
      , usuario = geddy.model.Usuario.create(params);
      
    if (!usuario.isValid()) {
      this.respondWith(usuario);
    }
    else {
      geddy.log.info("usu valido " +params.perfilId);

      geddy.model.adapter.Perfil.findPerfilById (params.perfilId, function(err,perfil){
        geddy.log.info("... perfil encontrado " +perfil);  
        params.perfil = perfil;
      
        geddy.log.info("usu perfil escolhido " +params.perfil);

        geddy.model.adapter.Usuario.criar(params, function (err, data) {
          if (err) {
            geddy.log.info("usu erro "+ err);
            throw err;
          }
          geddy.log.info("usu salvo "+ data);
          self.respondWith(usuario, {status: err});
        });
      });
    }
  };

  this.logout = function(req, resp, params){
    geddy.log.info(" logout.... ");
    if(!this.session.isExpired()){
      this.session.unset('usuario');
      geddy.log.info("saindo... ");
      this.session.close();
      
      this.redirect({controller: 'Main', action: 'login'});
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Usuario.first(params.id, function(err, usuario) {
      if (err) {
        throw err;
      }
      if (!usuario) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(usuario);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Usuario.buscaUsuarioPorId(params.id, function(err, usuario) {
      if (err) {
        throw err;
      }
      if (!usuario) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.adapter.Perfil.all(function (err, perfils) {
          if (err) {
            throw err;
          }
        self.respond({usuario: usuario, perfils: perfils});
       });
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    var cleanTodo = {
      id:     params.id,
      nome:   params.nome,
      login:  params.login,
      senha:  params.senha,
      email:  params.email,
      perfil: params.perfilId
    };
    
    var todo = geddy.model.Usuario.create(cleanTodo);
    if (!todo.isValid()) {
      self.respondWith(todo.errors, null);
    }
    
    geddy.model.adapter.Perfil.findPerfilById (params.perfilId, function(err,perfil){
      geddy.log.info("... perfil encontrado " +perfil);  
      cleanTodo.perfil = perfil;
      
      geddy.log.info("usu perfil escolhido " +params.perfilId+" "+cleanTodo.perfil);

      geddy.model.adapter.Usuario.update(todo.id, cleanTodo, function(err, doc){
        geddy.log.info ("dentro do findOne "+doc);
        if (err) {
           geddy.log.info("deu erro");
          throw err;
        }
        // if we already have the to do item, update it with the new values
        if (doc) {
          geddy.log.info("tem doc "+doc);
          self.redirect({controller: 'Usuarios', action: 'index'});
        }
        // if we don't already have the to do item, save a new one
        else {
          geddy.log.info("else");
          geddy.model.adapter.Usuario.save(todo, function(err, docs){
            self.respondWith(docs, {status: err});
          });
        }
      });
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.log.info("remover... "+params.id);

    geddy.model.adapter.Usuario.remover(params.id, function(err, usuario) {
      geddy.log.info("remover usuario de id: "+usuario);
      if (err) {
        throw err;
      }
      if (!usuario) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.log.info("remover terminado ");
        self.respondWith(usuario);
      }
    });
  };

};

exports.Usuarios = Usuarios;
