var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AtividadeRespostaSchema = new Schema({
    data: {type: String, required: true},
    fileNome: {type: String},
    atividade: {}
  }
);

AtividadeRespostaSchema.static('buscaAtividadeRespPorId', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, data){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, data);
  });
});

AtividadeRespostaSchema.static('criar', function (data, cb){
  geddy.log.info("Chegou no criar: "+data);
  this.create(data, function (err, dt) {
      if (err) {
        throw err;
      }
      geddy.log.info("resposta added to db: "+ dt);
      return cb(null, dt);
    });
});

AtividadeRespostaSchema.static('update', function (id, query, cb){
  geddy.log.info("dentro do update data de id: "+id+" "+query);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).update(query, function (err, resp) {
      if (err) {
        throw err;
      }
      geddy.log.info("Atv updateada to db: "+ resp);
      return cb(null, resp);
  });
});

AtividadeRespostaSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover data de id: "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).remove( function (err, resp) {
      if (err) {
        throw err;
      }
      geddy.log.info("People removida to db: "+ resp);
      return cb(null, resp);
    });
});


AtividadeRespostaSchema.static('all', function (callback) {
  var resp = [];
  this.find(function(err, docs){
    if (err) {
      return callback(err, null);
    }
    for (var i in docs) {
      //datas.push( geddy.model.data.create(docs[i]) );
      resp.push( docs[i] );
    }
    geddy.log.info("all "+resp);
    return callback(null, resp);
  });
});

module.exports =  mongoose.model('AtividadeResposta', AtividadeRespostaSchema);
