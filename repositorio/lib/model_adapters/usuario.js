var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nome : {type: String, required: true},
    login: {type: String, required: true},
    senha: {type: String, required: true},
    email: {type: String, required: true},
    perfil:{}
  }
);

UsuarioSchema.static('buscaUsuarioPorId', function (id, cb) {
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, usuario){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, usuario);
  });
});

UsuarioSchema.static('buscaUsuarioPorLoginSenha', function (login, cb) {
    this.findOne(login, function(err, usuario){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, usuario);
  });
});

UsuarioSchema.static('buscaUsuarioPorEmail', function (email, cb) {
    this.findOne({email: email}, function(err, usuario){
      if (err) {
        return cb(err, null);
      }      
      return cb(null, usuario);
  });
});

UsuarioSchema.static('criar', function (usuario, cb){
  geddy.log.info("Chegou no criar: "+usuario);
  this.create(usuario, function (err, usu) {
      if (err) {
        throw err;
      }
      geddy.log.info("People added to db: "+ usu);
      return cb(null, usu);
    });
});

UsuarioSchema.static('update', function (id, query, cb){
  geddy.log.info("dentro do update usuario de id: "+id+" "+query);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).update(query, function (err, usu) {
      if (err) {
        throw err;
      }
      geddy.log.info("People updateada to db: "+ usu);
      return cb(null, usu);
  });
});

UsuarioSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover usuario de id: "+id);
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

//retorna um array 
UsuarioSchema.static('findUsuarioByName', function (title, cb) {
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

UsuarioSchema.static('all', function (callback) {
  var usuarios = [];
  this.find(function(err, docs){
    if (err) {
      return callback(err, null);
    }
    for (var i in docs) {
      //usuarios.push( geddy.model.Usuario.create(docs[i]) );
      usuarios.push( docs[i] );
    }
    return callback(null, usuarios);
  });
});

module.exports =  mongoose.model('Usuario', UsuarioSchema);
