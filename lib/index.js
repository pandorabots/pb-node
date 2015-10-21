var fs = require('fs'),
    path = require('path'),
    qs = require('querystring'),
    httpClient = require('request'),
    extend = require('extend');

function Pandorabot(options) {
  this.options = extend({
    user_key: null,
    app_id: null,
    botname: null,
    url: 'https://aiaas.pandorabots.com'
  }, options);
}

Pandorabot.prototype._buildEndpoint = function(api, glob, file) {
  var endpoint = this.options.url + path.join(api, this.options.app_id);

  if (!glob) {
    endpoint += '/' + this.options.botname;
  }

  if (file) {
    var filetype, filename;
    var fileObj = path.parse(file);
    if (fileObj.ext === '.aiml') {
      // file is an AIML file
      filetype = 'file';
      filename = file;
    }

    else {
      // file was of another type
      filetype = fileObj.ext.substring(1);
      if (fileObj.ext !== '.properties' && fileObj.ext !== '.pdefaults') {
        filename = fileObj.name;
      }
    }

    endpoint += '/' + filetype;

    if (filename) {
      endpoint+= '/' + filename;
    }
  }

  return endpoint;
};

Pandorabot.prototype._makeRequestOptions = function(method, api, glob, params, filetype, filename) {
  var requestOptions =  {
    url: this._buildEndpoint(api, glob, filetype, filename),
    method: method,
  };

  if (method === 'GET' || method === 'PUT' || method === 'DELETE') {
    requestOptions.qs = { user_key: this.options.user_key };
  }

  else {
    requestOptions.form = { user_key: this.options.user_key };
  }

  if (params) {
    extend(requestOptions.qs || requestOptions.form, params);
  }

  return requestOptions;
}

Pandorabot.prototype._request = function(options, filestream, cb) {

  if (!cb && typeof filestream === 'function') {
    cb = filestream;
  }

  if (typeof filestream !== 'function') {
    filestream.pipe(httpClient(options, respHandler));
  }

  else if (options.qs &&  options.qs.return === 'zip') {
    var writeStream = fs.createWriteStream(this.options.botname + '.zip');
    httpClient(options)
      .on('response', function(response) {
        cb(null, { status: 'ok' });
      })
      .pipe(writeStream);
  }

  else {
    httpClient(options, respHandler);
  }

  function respHandler(error, response, body) {
    if (error) {
      cb(error);
    }

    else {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // not JSON
      }
      cb(null, body);
    }
  }
};

Pandorabot.prototype.list = function(cb) {
  var options = this._makeRequestOptions('GET', '/bot', true);
  this._request(options, cb);
};

Pandorabot.prototype.create = function(cb) {
  var options = this._makeRequestOptions('PUT', '/bot', false);
  this._request(options, cb);
};

Pandorabot.prototype.delete = function(cb) {
  var options = this._makeRequestOptions('DELETE', '/bot', false);
  this._request(options, cb);
};

Pandorabot.prototype.get = function(zip, cb) {
  var params = {}, options;
  if (!cb && typeof zip === 'function') cb = zip;
  if (zip && typeof zip === 'boolean') params.return = 'zip';
  options = this._makeRequestOptions('GET', '/bot', false, params);
  this._request(options, cb);
};

Pandorabot.prototype.upload = function(filepath, cb) {
  var self = this;

  var filename;
  var file = path.parse(filepath).base;

  var options = self._makeRequestOptions('PUT', '/bot', false, null, file);

  fs.stat(filepath, function(err, stat) {
    if (err) {
      cb(err);
      return;
    } else {
      options.headers = { "Content-Length": stat.size };
      var stream = fs.createReadStream(filepath);
      self._request(options, stream, cb);
    }
  });
};

Pandorabot.prototype.remove = function(file, cb) {
  var options = this._makeRequestOptions('DELETE', '/bot', false, null, file);
  this._request(options, cb);
};

Pandorabot.prototype.getFile = function(file, cb) {
  var options = this._makeRequestOptions('GET', '/bot', false, null, file)
  this._request(options, cb);
};

Pandorabot.prototype.compile = function(cb) {
  var options = this._makeRequestOptions('GET', '/bot', false);
  options.url = options.url + '/verify';
  this._request(options, cb);
};

Pandorabot.prototype.talk = function(params, cb) {
  var options = this._makeRequestOptions('POST', '/talk', false, params);
  this._request(options, cb);
};

Pandorabot.prototype.atalk = function(params, cb) {
  var options = this._makeRequestOptions('POST', '/atalk', false, params);
  this._request(options, cb);
};

module.exports = Pandorabot;
