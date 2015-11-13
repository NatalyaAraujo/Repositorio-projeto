var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PerfilSchema = new Schema({
    nome : {type: String, required: true},
    permissoes: []
  }
);

PerfilSchema.static('findPerfilById', function (id, cb) {
  var perfil= '';
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, perfil){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, perfil);
  });
});

PerfilSchema.static('criar', function (perfil, cb){
  this.create(perfil, function (err, per) {
      if (err) {
        throw err;
      }
      return cb(null, per);
    });
});

PerfilSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover perfil de id: "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find({_id : o_id}).remove( function (err, per) {
      if (err) {
        throw err;
      }
      geddy.log.info("Perfil removida to db: "+ per);
      return cb(null, per);
    });
});

PerfilSchema.static('update', function (id, query, cb){

  geddy.log.info("dentro do update " +query.permissoes+" "+query.nome+" "+query.permissoes[0].id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);

  geddy.log.info(".... " );

    this.find({ _id : id }).update({nome: query.nome}, function(err, per){
    geddy.log.info("dentro do mongo update " +per+" "+err);
    if (err) {
        return cb(err, null);
      } 
    return cb(null, per);
  });
});

//retorna um array 
PerfilSchema.static('findPerfilByName', function (title, cb) {
  var perfil = [];
    this.find({ nome : new RegExp(title, 'i') }, function(err, docs){
    if (err) {
      return cb(err, null);
    }
    for (var i in docs) {
      perfil.push(geddy.model.Perfil.create(docs[i]));
    }
    return cb(null, perfil);
  });
});

PerfilSchema.static('findPerfilByStatus', function (status, cb) {
    this.find({ status : new RegExp(status, 'i') }, cb);
  });

PerfilSchema.static('all', function (callback) {
  var perfils = [];
  this.find(function(err, docs){
    // if there's an error, return early
    if (err) {
      return callback(err, null);
    }
    // iterate through the docs and create models out of them
    for (var i in docs) {
      perfils.push( geddy.model.Perfil.create(docs[i]) )
    }
    return callback(null, perfils);
  });
});

// create an export function to encapsulate the model creation
module.exports =  mongoose.model('Perfil', PerfilSchema);
