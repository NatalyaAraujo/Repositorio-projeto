var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissaoSchema = new Schema({
    nome: {type: String, required: true},
    entidade: {}
  }
);

PermissaoSchema.static('buscaPermissaoPorId', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.findOne({ _id : o_id }, function(err, data){
      if (err) {
        return cb(err, null);
      }
      return cb(null, data);
  });
});

PermissaoSchema.static('criar', function (data, cb){
  geddy.log.info("Chegou no criar: "+data);
  this.create(data, function (err, dt) {
      if (err) {
        return cb(err, null);
      }
      geddy.log.info("Permissao added to db: "+ dt);
      return cb(null, dt);
    });
});

PermissaoSchema.static('update', function (id, query, cb){
  geddy.log.info("dentro do update data de id: "+id+" "+query);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).update(query, function (err, usu) {
      if (err) {
        return cb(err, null);
      }
      geddy.log.info("Permissao updateada to db: "+ usu);
      return cb(null, usu);
  });
});

PermissaoSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover data de id: "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).remove( function (err, usu) {
      if (err) {
        return cb(err, null);
      }
      geddy.log.info("People removida to db: "+ usu);
      return cb(null, usu);
    });
});


PermissaoSchema.static('all', function (callback) {
  var permissaos = [];
  this.find(function(err, docs){
    if (err) {
      return callback(err, null);
    }
    for (var i in docs) {
      //permissaos.push( geddy.model.Permissao.create(docs[i]) );
      permissaos.push( docs[i] );
    }
    //geddy.log.info("all "+permissaos);
    return callback(null, permissaos);
  });
});

module.exports =  mongoose.model('Permissao', PermissaoSchema);
