var http = require('http');
var fs = require('fs');
var request = require('request');
var querystring = require('querystring');
var protocol = 'https';

// Pandorabot Constructor 

function Pandorabot (options) {
  this.host = options.host;
  this.app_id = options.app_id;
  this.botname = options.botname;
  this.user_key = options.user_key;
}

// Global method

Pandorabot.prototype.listBots = function (callback) {
  var path = '/bot/' + this.app_id + '?';
  var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  request.get(params, function (error, response, body) {
      callback(error, response, body);
  });
};

// Bot methods

Pandorabot.prototype.createBot = function (callback) {
  var path = '/bot/' + this.app_id + '/' + this.botname + '?';
  var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  request.put(params, function (error, response, body) {
      callback(error, response, body);
  });
};

Pandorabot.prototype.deleteBot = function (callback) {
  var path = '/bot/' + this.app_id + '/' + this.botname + '?';
  var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  request.del(params, function (error, response, body) {
      callback(error, response, body);
  });
};

Pandorabot.prototype.listFiles = function (options, callback) {
  if (!callback)
    callback = options;
  var path = '/bot/' + this.app_id + '/' + this.botname + '?';
  if (options.return)
    var qs = querystring.stringify({ user_key: this.user_key, return: options.return });
  else 
    var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  if (!options.return) {
    request.get(params, function (error, response, body) {
      if (!error)
        callback(error, response, body);
    });
  } else {
    request(params.url)
      .pipe(fs.createWriteStream(options.filename + '.zip'))
      .on('error', function (error) { callback(error) })
      .on('close', function () {
        callback('OK');
      });
  }
};

Pandorabot.prototype.uploadFile = function (options, callback) {
  if (options.filename) {
    var path = '/bot/' + this.app_id + '/' + this.botname + '/' + options.filetype + '/' + options.filename + '?';
  } else {
    var path = '/bot/' + this.app_id + '/' + this.botname + '/' + options.filetype + '?';
  }
  var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  fs.stat(options.filepath, function (error, stat) {
    if (error) { throw error; }
    params.headers = { "Content-Length": stat.size };
    fs.createReadStream(options.filepath)
      .pipe(request.put(params, function (error, response, body) {
          callback(error, response, body);
      }));
  });
};

Pandorabot.prototype.deleteFile = function (options, callback) {
  if (options.filename) {
    var path = '/bot/' + this.app_id + '/' + this.botname + '/' + options.filetype + '/' + options.filename + '?';
  } else {
    var path = '/bot/' + this.app_id + '/' + this.botname + '/' + options.filetype + '?';
  }
  var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  request.del(params, function (error, response, body) {
      callback(error, response, body);
  });
};

Pandorabot.prototype.compileBot = function (callback) {
  var path = '/bot/' + this.app_id + '/' + this.botname + '/verify?';
  var qs = querystring.stringify({ user_key: this.user_key });
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  request.get(params, function (error, response, body) {
      callback(error, response, body);
  });
};

Pandorabot.prototype.talk = function (options, callback) {
  var path = '/talk/' + this.app_id + '/' + this.botname + '?';
  options.user_key = this.user_key;
  var qs = querystring.stringify(options);
  var params = {
    url: protocol + '://' + this.host + path + qs
  };
  request.post(params, function(error, response, body) {
        callback(error, response, body);
  });
};

module.exports = Pandorabot;