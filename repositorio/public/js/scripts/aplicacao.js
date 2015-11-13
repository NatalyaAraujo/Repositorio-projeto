
var Cliente = function(){
	var that = this;
  var permissoes = [];
  var usuario = null;
  var perfil = null;
   
   this.getUsuario = function(){
      usuario = Ajax.send("/usuarios/autenticado", 'json');
      perfil = usuario.perfil;
      permissoes = perfil.permissoes || [];
   };

  this.temPermissao = function(permissao, entidade){
    for (var i = 0; i < permissoes.length; i++) {
      if(permissoes[i].nome == permissao && permissoes[i].entidade.nome == entidade){
        return true;
      }
    }
    return false;
  };

  this.constroiHtml = function(html){
    
    var elements = $(html);
      $(elements).find("*[data-permissao]").each(function() {
        for (var i=0; i < permissoes.length; i++){
          if (!that.temPermissao($(this).attr("data-permissao"), $(this).attr("data-entidade"))) {
            $(this).remove();
          }
        }
      });
    return elements.html();
  };

  this.init = function(html){
    that.getUsuario();
    $("#main-menu").html(that.constroiHtml(html));
  };
  
};