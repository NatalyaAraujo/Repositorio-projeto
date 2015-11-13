var Mensagems = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Mensagem.all(function(err, mensagems) {
      if (err) {
        throw err;
      }
      self.respond({mensagems: mensagems});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
    geddy.model.adapter.Usuario.all(function(err, usuarios) {
        if (err) {
          throw err;
        }
       var usuario = self.session.get('usuario');
       params.remetente = usuario.email;
       geddy.log.info("... o remetente eh " +usuario.email);  
      self.respond({params: params, destinatarios: usuarios});
    });
  };

  this.create = function (req, resp, params) {
    var data = new Date();
    params.dtEnvio = data.toLocaleString();
    var self = this
      , mensagem = geddy.model.Mensagem.create(params);
      
    if (!mensagem.isValid()) {
      this.respondWith(mensagem);
    }
    else {
      var usuario = self.session.get('usuario');
      //geddy.log.info("email do remetente " +params.remetente);

      geddy.model.adapter.Usuario.buscaUsuarioPorEmail (usuario.email, function(err, remetente){
        geddy.log.info("... remetente encontrado " +remetente);  
        params.remetente = remetente;
      
        //geddy.log.info("usu perfil escolhido " +params.perfil);

        geddy.model.adapter.Usuario.buscaUsuarioPorId (params.destinatarioId, function (err, destinatario) {
          if (err) {
            geddy.log.info("dest erro "+ err);
            throw err;
          }
          params.destinatarioId='';
          params.destinatario = destinatario;
          geddy.log.info("o dest "+ destinatario);

          geddy.model.adapter.Mensagem.criar(params, function (err, data) {
            if (err) {
              geddy.log.info("msg erro "+ err);
              throw err;
            }
            self.respondWith(data, {status: err});
          });
        });
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      if (!mensagem) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(mensagem);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      if (!mensagem) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(mensagem);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      mensagem.updateProperties(params);

      if (!mensagem.isValid()) {
        self.respondWith(mensagem);
      }
      else {
        mensagem.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(mensagem, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.Mensagem.first(params.id, function(err, mensagem) {
      if (err) {
        throw err;
      }
      if (!mensagem) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Mensagem.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(mensagem);
        });
      }
    });
  };

};

exports.Mensagems = Mensagems;
