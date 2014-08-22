var http = require('http');
var fs = require('fs');
var request = require('request');
var querystring = require('querystring');

var protocol = 'https';

module.exports = {

  createBot: function(options, callback) {
    var path = '/bot/' + options.username + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.put(params, function(error, response, body) {
      callback(error, response, body);
    });
  },

  deleteBot: function(options, callback) {
    var path = '/bot/' + options.username + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.del(params, function(error, response, body) {
      callback(error, response, body);
    });
  },

  uploadFile: function(options, callback) {
    if (options.filename) {
      var path = '/bot/' + options.username + '/' + options.botname + '/' + options.filetype + '/' + options.filename + '?';
    } else {
      var path = '/bot/' + options.username + '/' + options.botname + '/' + options.filetype + '?';
    }
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    }
    fs.stat(options.filepath, function(error, stat) {
      if (error) { throw error; }
      params.headers = { "Content-Length": stat.size }
      fs.createReadStream(options.filepath)
        .pipe(request.put(params, function(err, response, body) {
          callback(error, response, body);
        }));
    });
  },

  compileBot: function(options, callback) {
    var path = '/bot/' + options.username + '/' + options.botname + '/verify?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs,
    };
    request.get(params, function(error, response, body) {
      callback(error, response, body);
    });
  },

  talk: function(options, callback) {
    var path = '/talk/' + options.username + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs,
    };
    request.post(params, function(error, response, body) {
      callback(error, response, body);
    });
  },

};


