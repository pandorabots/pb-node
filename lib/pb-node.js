var http = require('http');
var fs = require('fs');
var request = require('request');
var querystring = require('querystring');

var protocol = 'https';

module.exports = {

  listBots: function (options, callback) {
    var path = '/bot/' + options.app_id + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.get(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  },

  createBot: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.put(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  },

  deleteBot: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.del(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  },

  listFiles: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.get(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  },

  uploadFile: function(options, callback) {
    if (options.filename) {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '/' + options.filename + '?';
    } else {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '?';
    }
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    fs.stat(options.filepath, function(error, stat) {
      if (error) { throw error; }
      params.headers = { "Content-Length": stat.size };
      fs.createReadStream(options.filepath)
        .pipe(request.put(params, function(error, response, body) {
          if (!error)
            callback(body);
        }));
    });
  },

  deleteFile: function(options, callback) {
    if (options.filename) {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '/' + options.filename + '?';
    } else {
      var path = '/bot/' + options.app_id + '/' + options.botname + '/' + options.filetype + '?';
    }
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    console.log(params);
    request.del(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  },

  compileBot: function(options, callback) {
    var path = '/bot/' + options.app_id + '/' + options.botname + '/verify?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.get(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  },

  talk: function(options, callback) {
    var path = '/talk/' + options.app_id + '/' + options.botname + '?';
    var qs = querystring.stringify(options.q);
    var params = {
      url: protocol + '://' + options.host + path + qs
    };
    request.post(params, function(error, response, body) {
      if (!error)
        callback(body);
    });
  }

};


