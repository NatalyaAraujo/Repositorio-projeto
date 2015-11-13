var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TurmaSchema = new Schema({
    nome : {type: String, required: true},
    alunos:[],
    professor:{}
    //, atividades:[]
  }
);

TurmaSchema.static('findTurmaById', function (id, cb) {
  //var Turma= '';
  geddy.log.info("chegou no turmas "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
    this.findOne({ _id : o_id }, function(err, data){
      if (err) {
        return cb(err, null);
      }      
      geddy.log.info("Turma byId "+ data);
      return cb(null, data);
  });
});

TurmaSchema.static('criar', function (Turma, cb){
  this.create(Turma, function (err, per) {
      if (err) {
        throw err;
      }
      return cb(null, per);
    });
});

TurmaSchema.static('remover', function (id, cb){
  geddy.log.info("dentro do remover Turma de id: "+id);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);
  this.find( {_id : o_id}).remove( function (err, per) {
      if (err) {
        throw err;
      }
      geddy.log.info("Turma removida to db: "+ per);
      return cb(null, per);
    });
});

TurmaSchema.static('update', function (id, query, cb){

  geddy.log.info("dentro do update " +id+" "+query.nome);
  var ObjectID = require('mongodb').ObjectID; 
  var o_id = new ObjectID(id);

  geddy.log.info(".... " );

    this.find({ _id : id }).update(query, function(err, per){
    geddy.log.info("dentro do mongo update " +per);
    if (err) {
        return cb(err, null);
      } 
    return cb(null, per);
  });
});

//retorna um array 
TurmaSchema.static('findTurmaByName', function (title, cb) {
  var Turma = [];
    this.find({ nome : new RegExp(title, 'i') }, function(err, docs){
    if (err) {
      return cb(err, null);
    }
    for (var i in docs) {
      Turma.push(geddy.model.Turma.create(docs[i]));
    }
    return cb(null, Turma);
  });
});

TurmaSchema.static('findTurmaByStatus', function (status, cb) {
    this.find({ status : new RegExp(status, 'i') }, cb);
  });

TurmaSchema.static('all', function (callback) {
  var Turmas = [];
  this.find(function(err, docs){
    // if there's an error, return early
    if (err) {
      return callback(err, null);
    }
    // iterate through the docs and create models out of them
    for (var i in docs) {
      Turmas.push( geddy.model.Turma.create(docs[i]) )
    }
    return callback(null, Turmas);
  });
});

// create an export function to encapsulate the model creation
module.exports =  mongoose.model('Turma', TurmaSchema);
