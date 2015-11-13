var init = function(cb) {
  // Add uncaught-exception handler in prod-like environments
 
  var mongo = require('mongoose');

  var porta = "27017";
  var db = "repositorio-db";
  require('../lib/model_adapters/Perfil');
  require('../lib/model_adapters/Usuario');
  require('../lib/model_adapters/Atividade');
  require('../lib/model_adapters/Atividade_Resposta');
  require('../lib/model_adapters/Entidade');
  require('../lib/model_adapters/Permissao');
  require('../lib/model_adapters/Turma');
  require('../lib/model_adapters/Mensagem');

  var Perfil = mongo.model("Perfil");
  var Usuario = mongo.model("Usuario");
  var Atividade = mongo.model("Atividade");
  var AtividadeResposta = mongo.model("AtividadeResposta");
  var Entidade = mongo.model("Entidade");
  var Permissao = mongo.model("Permissao");
  var Turma = mongo.model("Turma");
  var Mensagem = mongo.model("Mensagem");

  mongo.connect('mongodb://localhost:'+ porta +'/'+db, function (err) {
    if (err) throw err;

    //Usuario.create({
    //  nome : 'ash',
    //});
  //  Perfil.create({
   //   nome: 'admin'
   // });
  });

  if (geddy.config.environment != 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);
    });
  }
  cb();
  geddy.model.adapter = {};
  geddy.model.adapter.Perfil = Perfil;
  geddy.model.adapter.Usuario = Usuario;
  geddy.model.adapter.Atividade = Atividade;
  geddy.model.adapter.AtividadeResposta = AtividadeResposta;
  geddy.model.adapter.Entidade = Entidade;
  geddy.model.adapter.Permissao = Permissao;
  geddy.model.adapter.Turma = Turma;
  geddy.model.adapter.Mensagem = Mensagem;
  geddy.util = {};
  geddy.util.permissoes = [];
  geddy.util.entidades = [];

  geddy.model.adapter.Permissao.all(function(err, permissoes){
    geddy.util.permissoes = permissoes;
    //geddy.log.info("todas as permissoes sao "+geddy.util.permissoes);
  });

  geddy.model.adapter.Entidade.all(function(err, entidades){
    geddy.util.entidades = entidades;
    //geddy.log.info("todas as entidades sao "+geddy.util.entidades);
  });

};

exports.init = init;