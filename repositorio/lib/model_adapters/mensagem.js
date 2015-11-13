var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensagemSchema = new Schema({
    remetente : {},
    destinatario : [],
    texto: {type: String, required: true},
    dtEnvio: {type: String}, 
    lida : {type: Boolean}
  }
);

MensagemSchema.static('buscaMensagemPorId', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, data){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, data);
  });
});

MensagemSchema.static('criar', function (data, cb){
  geddy.log.info("Chegou no criar: "+data);
  this.create(data, function (err, dt) {
      if (err) {
        throw err;
      }
      geddy.log.info("Mensagem added to db: "+ dt);
      return cb(null, dt);
    });
});

MensagemSchema.static('update', function (id, query, cb){
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

MensagemSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover data de id: "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).remove( function (err, usu) {
      if (err) {
        throw err;
      }
      geddy.log.info("Mensagem removida to db: "+ usu);
      return cb(null, usu);
    });
});


MensagemSchema.static('all', function (callback) {
  var Mensagems = [];
  this.find(function(err, docs){
    if (err) {
      return callback(err, null);
    }
    for (var i in docs) {
      //datas.push( geddy.model.data.create(docs[i]) );
      Mensagems.push( docs[i] );
    }
    geddy.log.info("all "+Mensagems);
    return callback(null, Mensagems);
  });
});

module.exports =  mongoose.model('Mensagem', MensagemSchema);
