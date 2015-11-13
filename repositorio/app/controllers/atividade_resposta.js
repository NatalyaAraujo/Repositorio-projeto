var formidable = require('formidable')
  , fs = require('fs')
  , path = require('path');

var AtividadeResposta = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.AtividadeResposta.all(function(err, atividadeResposta) {
      if (err) {
        throw err;
      }
      self.respond({atividadeResposta: atividadeResposta});
    });
  };

  this.add = function (req, resp, params) {
      var data = {
        // Pass the filename down, if this is a redirect from upload
        uploadedFile: params.uploaded_file
      };
    this.respond(data, {params: params});
  };

  this.create = function (req, resp, params) {
    var self = this;
    geddy.log.info("create...");
    var data = new Date();
    params.data = data.toLocaleString();
    geddy.log.info("... "+data.toLocaleString());

    var ObjectID = require('mongodb').ObjectID; 
    var o_id = new ObjectID(params.atividadeId);
    params.atividade = {
      _id : o_id
    };
    delete params.atividadeId;

    var atividadeRespostum = geddy.model.AtividadeRespostum.create(params);
      geddy.log.info("a data q xegou eh "+params.data);
    if (!atividadeRespostum.isValid()) {
      geddy.log.info("resposta invalida!");
      this.respondWith(atividadeRespostum);
    }
    else {
      geddy.log.info("resposta valida!");
      self.upload(req, resp, params, function (){
        geddy.log.info("upload terminado!");
        geddy.model.adapter.AtividadeResposta.criar(params, function(err, data) {
          geddy.log.info("callback create "+atividadeRespostum);
          geddy.log.info("callback create "+atividadeRespostum.data);
          if (err) {
            geddy.log.info("deu erro "+err);
            throw err;
          }
          self.respondWith(atividadeRespostum, {status: err});
        });  
      });
    }
  };

  this.upload = function (req, resp, params, cb) {
    geddy.log.info("upload comecando...");
    var self = this
      , form = new formidable.IncomingForm()
      , uploadedFile
      , savedFile
      , fileName;
    // Handle each part of the multi-part post
    form.onPart = function (part) {
      // Handle each data chunk as data streams in
      part.addListener('data', function (data) {
        // Initial chunk, set the filename and create the FS stream
        if (!uploadedFile) {
          uploadedFile = encodeURIComponent(part.filename);
          savedFile = fs.createWriteStream(path.join('public', 'uploads', uploadedFile));
          fileName = part.filename;
        }
        // Write each chunk to disk
        savedFile.write(data);
      });
      // The part is done
      part.addListener('end', function () {
        geddy.log.info("o nome do arquivo eh "+fileName+" "+params);
        params.fileNome = fileName;
        var err;
        // If everything went well, close the FS stream
        if (uploadedFile) {
          savedFile.end();
        }
        // Something went wrong
        else {
          err = new Error('Something went wrong in the upload.');
          self.error(err);
        }
      });
    };

    // Multi-part form is totally done, redirect back to index
    // and pass filename
    form.addListener('end', function () {
      return cb();
      //self.redirect('/?uploaded_file=' + uploadedFile);
    }); 
    
    // Do it
    form.parse(req);
    
  };


  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.AtividadeRespostum.first(params.id, function(err, atividadeRespostum) {
      if (err) {
        throw err;
      }
      if (!atividadeRespostum) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(atividadeRespostum);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.adapter.AtividadeRespostum.buscaAtividadeRespPorId(params.id, function(err, atividadeRespostum) {
      if (err) {
        throw err;
      }
      if (!atividadeRespostum) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respond({atividadeRespostum: atividadeRespostum});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.AtividadeRespostum.first(params.id, function(err, atividadeRespostum) {
      if (err) {
        throw err;
      }
      atividadeRespostum.updateProperties(params);

      if (!atividadeRespostum.isValid()) {
        self.respondWith(atividadeRespostum);
      }
      else {
        atividadeRespostum.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(atividadeRespostum, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.AtividadeRespostum.first(params.id, function(err, atividadeRespostum) {
      if (err) {
        throw err;
      }
      if (!atividadeRespostum) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.AtividadeRespostum.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(atividadeRespostum);
        });
      }
    });
  };

};

exports.AtividadeResposta = AtividadeResposta;
