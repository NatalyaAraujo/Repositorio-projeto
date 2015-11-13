var Usuario = function () {

  this.defineProperties({
    nome : {type: 'string', required: true},
    login: {type: 'string', required: true},
    senha: {type: 'string', required: true},
    email: {type: 'string', required: true}
  });

this.hasMany('Atividades');
this.hasMany('Turmas');

this.validatesLength('login', {min: 3});
this.validatesLength('senha', {min: 3});

this.validatesWithFunction('email', function (val){
  // /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    if(!val.match(/\S+@\S+\.\S+/)){ // Jaymon's / Squirtle's solution
        // Do something
      geddy.log.info(" nao passou na validacao ");
        return false;
    }
    if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
        // Do something
        geddy.log.info(" nao passou na validacao 2");
        return false;
    }
    geddy.log.info(" passou na validacao ");
    return true;
});

  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  
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
Usuario.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Usuario.someStaticMethod = function () {
  // Do some other stuff
};
Usuario.someStaticProperty = 'YYZ';
*/

Usuario = geddy.model.register('Usuario', Usuario);
