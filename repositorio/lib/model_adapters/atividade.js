var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AtividadeSchema = new Schema({
    descricao: {type: String, required: true},
    titulo: {type: String},
    dataInicio: {type: String},
    dataFim: {type: String},
    dataCriacao: {type: String, required: true},
    criador: {},
    turma: {}
  }
);

AtividadeSchema.static('buscaAtividadePorId', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, data){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, data);
  });
});

AtividadeSchema.static('buscaAtividadePorTurma', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.find({ turma: {_id : o_id} }, function(err, data){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, data);
  });
});

AtividadeSchema.static('criar', function (data, cb){
  geddy.log.info("Chegou no criar: "+data);
  this.create(data, function (err, dt) {
      if (err) {
        throw err;
      }
      geddy.log.info("atividade added to db: "+ dt);
      return cb(null, dt);
    });
});

AtividadeSchema.static('update', function (id, query, cb){
  geddy.log.info("dentro do update data de id: "+id+" "+query);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).update(query, function (err, usu) {
      if (err) {
        throw err;
      }
      geddy.log.info("Atv updateada to db: "+ usu);
      return cb(null, usu);
  });
});

AtividadeSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover data de id: "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).remove( function (err, usu) {
      if (err) {
        throw err;
      }
      geddy.log.info("People removida to db: "+ usu);
      return cb(null, usu);
    });
});


AtividadeSchema.static('all', function (callback) {
  var atividades = [];
  this.find(function(err, docs){
    if (err) {
      return callback(err, null);
    }
    for (var i in docs) {
      //datas.push( geddy.model.data.create(docs[i]) );
      atividades.push( docs[i] );
    }
    geddy.log.info("all "+atividades);
    return callback(null, atividades);
  });
});

module.exports =  mongoose.model('Atividade', AtividadeSchema);
