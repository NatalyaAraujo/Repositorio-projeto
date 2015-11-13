var Ajax = {
  send: function(url, dataType){
    var response = null;
    $.ajax({
        url: url,
        dataType: dataType,
        async: false,
        success : function(data){
          //console.log("deu certo "+data);
          /*if (data instanceof Document) {
            response = null;
          } else if (typeof(data) == 'string') {
            try {
              response = $.parseJSON(data);
            } catch (e) {
              response = data;
            }
          } else {*/
            response = data;
            //console.log("deu certo "+response);
          //}
          
        },
        error: function(data){
          //console.log("deu errado "+data);
        }
      });
    return response;
  },

  aSend: function(url, dataType){
    //var response = null;
    $.ajax({
        url: url,
        dataType: dataType,
        success : function(data){
          //console.log("deu certo "+data);
          return data;
        },
        error: function(data){
          //console.log("deu errado "+data);
        }
      });
  }
};