var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntidadeSchema = new Schema({
    nome: {type: String, required: true}
  }
);

EntidadeSchema.static('buscaEntidadePorId', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, data){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, data);
  });
});

EntidadeSchema.static('criar', function (data, cb){
  geddy.log.info("Chegou no criar: "+data);
  this.create(data, function (err, dt) {
      if (err) {
        throw err;
      }
      geddy.log.info("Entidade added to db: "+ dt);
      return cb(null, dt);
    });
});

EntidadeSchema.static('update', function (id, query, cb){
  geddy.log.info("dentro do update data de id: "+id+" "+query);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).update(query, function (err, usu) {
      if (err) {
        throw err;
      }
      geddy.log.info("entidade updateada to db: "+ usu);
      return cb(null, usu);
  });
});

EntidadeSchema.static('remover', function (id, cb){
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


EntidadeSchema.static('all', function (callback) {
  var entidades = [];
  this.find(function(err, docs){
    if (err) {
      return callback(err, null);
    }
    for (var i in docs) {
      entidades.push( geddy.model.Entidade.create(docs[i]) );
      //entidades.push( docs[i] );
    }
  //  geddy.log.info("all "+entidades);
    return callback(null, entidades);
  });
});

module.exports =  mongoose.model('Entidade', EntidadeSchema);
