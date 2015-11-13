var Atividade = function () {

  this.defineProperties({
    descricao: {type: 'string', required: true},
    titulo: {type: 'string'},
    dataInicio: {type: 'datetime'},
    dataFim: {type: 'datetime'}
    , dataCriacao: {type: 'datetime'}
  });

this.belongsTo('Usuario');
this.property('titulo', 'string', {required: true});
  /*
  this.validatesWithFunction('usuarioId', function(s){
  geddy.model.Usuario.first({id: usuarioId}, function(err,usuario){
    if (err) {
        throw err;
      }
      if(usuario.id != ""){
        geddy.log.info("usuario id existente");
        return true;
      }
      return false;
    })
});

  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');
  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });
  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */
};

/*
// Can also define them on the prototype
Atividade.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Atividade.someStaticMethod = function () {
  // Do some other stuff
};
Atividade.someStaticProperty = 'YYZ';
*/

Atividade = geddy.model.register('Atividade', Atividade);
