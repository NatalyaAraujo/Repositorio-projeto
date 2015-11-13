
//var fs = require('fs');
//var $ = require('jquery');
//var jsdom = require("jsdom"); 
//var $ = require("jquery")(jsdom.jsdom().createWindow()); 

var Main = function () {
  var that = this;

  /*
  this.acessos = function(req, resp, params, entidade){
    var usuario = this.session.get('usuario');
    if (usuario.perfil.nome="admin"){
      //criar turmas
      if(entidade == "TURMAS"){
        return "LISTAR_TODOS";
      }

    } if (usuario.perfil.nome = "aluno"){

    } if (usuario.perfil.nome = "professor"){

    }
  }; */

  this.login = function (req, resp, params) {
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/main/login'
    });
  };

  this.index = function(req, resp, params){
    var self = this;
//    geddy.log.info(" to no index ");
 //   var filename = "app/views/layouts/application.html.ejs";
//    fs.readFile(filename, function(err, content){
 //     if(err){
 //       geddy.log.info(" o erro eh "+err);  
 //     }

  //    var perfil = self.session.get('usuario').perfil;
  //    geddy.log.info(" o perfil "+perfil);      
      that.respond({params: params}, {
        format: 'html'
      , template: 'app/views/main/index'
      });
  //  });
  };
};

exports.Main = Main;