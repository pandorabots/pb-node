var fs = require('fs'),
    Pandorabot = require('../lib'),
    nock = require('nock'),
    expect = require('chai').expect;

describe('class: Pandorabot', function() {

  describe('Constructor', function() {

    describe('new Pandorabot()', function() {
      var defaults = {};
      before(function() {
        defaults.user_key = null;
        defaults.app_id = null;
        defaults.botname = null;
        defaults.url = 'https://aiaas.pandorabots.com';
      });

      it('creates an instance', function() {
        var client = new Pandorabot();
        expect(client).to.be.instanceof(Pandorabot);
      });

      it('has default options', function() {
        var client = new Pandorabot();
        expect(Object.keys(defaults).length)
          .to.equal(Object.keys(client.options).length);
        expect(Object.keys(defaults))
          .to.eql(Object.keys(client.options));
      });

      it('accepts options and overrides defaults', function() {
        var options = {
          user_key: 'XXXXXX',
          app_id: '12345',
          botname: 'olimpia',
          url: 'https://foobar.pandorabots.com',
        };
        var client = new Pandorabot(options);
        expect(client.options.user_key).to.equal(options.user_key);
        expect(client.options.app_id).to.equal(options.app_id);
        expect(client.options.botname).to.equal(options.botname);
        expect(client.options.url).to.equal(options.url);
      });

    });
  });

  describe('Prototype', function() {

    var options = {
      user_key: 'XXXXXX',
      app_id: '12345',
      botname: 'olimpia',
      url: 'https://foobar.pandorabots.com'
    };

    describe('prototype._buildEndpoint()', function() {

      it('returns an valid bot endpoint', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/bot', true);
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/bot/12345')
      });

      it('returns an valid bot/botname endpoint', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/bot');
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/bot/12345/olimpia')
      });

      it('returns an valid talk endpoint', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/talk');
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/talk/12345/olimpia')
      });

      it('returns an valid atalk endpoint', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/atalk');
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/atalk/12345/olimpia')
      });

      it('returns a valid endpoint for uploading an AIML file', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/bot', false, 'example.aiml');
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/bot/12345/olimpia/file/example.aiml')
      });

      it('returns a valid endpoint for uploading a set file', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/bot', false, 'example.set');
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/bot/12345/olimpia/set/example')
      });

      it('returns a valid endpoint for uploading a properties file', function() {
        var client = new Pandorabot(options);
        var endpoint = client._buildEndpoint('/bot', false, 'olimpia.properties');
        expect(endpoint)
          .to.equal('https://foobar.pandorabots.com/bot/12345/olimpia/properties');
      });

    });

    describe('prototype._makeRequestOptions()', function() {
      it('returns base request options', function() {
        var client = new Pandorabot(options);
        var requestOptions = client._makeRequestOptions('GET', '/bot', true);
        expect(requestOptions).to.eql({
          url: 'https://foobar.pandorabots.com/bot/12345',
          method: 'GET',
          qs: {
            user_key: client.options.user_key
          }
        });
      });
    });

    describe('prototype._request()', function() {
      it('makes a request', function(done) {
        var client = new Pandorabot(options);

        var endpoint = client._buildEndpoint('/talk');

        nock(endpoint).post('', {
          user_key: client.options.user_key,
          input: 'foo',
          client_name: 'pb-node-user-001'
        }).reply(200, {
          status: 'ok',
          responses: ['bar']
        });

        var requestOptions = client._makeRequestOptions('POST', '/talk', false, {
          input: 'foo',
          client_name: 'pb-node-user-001'
        });

        client._request(requestOptions, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });
    });

    describe('prototype.list', function() {
      it('returns a list of your bots', function(done) {

        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345')
          .get('')
          .query({ user_key: client.options.user_key })
          .reply(200, [{}])

        client.list(function(err, res) {
          if (err) throw err;
          expect(res).to.eql([{}]);
          done();
        });

      });
    });

    describe('prototype.create', function() {
      it('creates a new bot', function(done) {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia')
          .put('')
          .query( {
            user_key: client.options.user_key
          })
          .reply(200, { status: 'ok' });

        client.create(function(err, res) {
          if (err) throw err;
          expect(res.status).to.eql('ok');
          done();
        });
      });
    });

    describe('prototype.delete', function() {
      it('deletes a bot', function() {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia')
          .delete('', {
            user_key: client.options.user_key
          })
          .reply(200, { status: 'ok' });

        client.delete(function(err, res) {
          if (err) throw err;
          expect(res.status).to.eql('ok');
          done();
        });

      });
    });

    describe('prototype.get', function() {
      it('gets a bot', function(done) {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia')
          .get('')
          .query({ user_key: client.options.user_key })
          .reply(200, {
            username: '12345',
            botname: 'olimpia'
          });

        client.get(function(err, res) {
          if (err) throw err;
          expect(res.username).to.equal('12345');
          expect(res.botname).to.equal('olimpia');
          done();
        });
      });

      it('gets a zip file of the bot files', function(done) {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia')
          .get('')
          .query({ user_key: client.options.user_key, return: 'zip' })
          .reply(200, {
            username: '12345',
            botname: 'olimpia'
          });

        client.get(true, function(err, res) {
          if (err) throw err;
          expect(res).to.be.ok;
          fs.writeFile('olimpia.zip', function(err) {
            expect(fs.existsSync('./olimpia.zip')).to.be.ok;
            fs.unlinkSync('./olimpia.zip');
            done();
          });
        });
      });
    });

    describe('prototype.upload', function() {
      it('uploads an AIML file', function(done) {
        var client = new Pandorabot(options);
        var filepath = __dirname + '/data/test.aiml';
        var file = fs.readFileSync(filepath, 'utf-8');

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/file/test.aiml')
          .put('', file)
          .query( { user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.upload(filepath, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });

      it('uploads a set file', function(done) {
        var client = new Pandorabot(options);
        var filepath = __dirname + '/data/test.set';
        var file = fs.readFileSync(filepath, 'utf-8');

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/set/test')
          .put('', file)
          .query( { user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.upload(filepath, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });

      it('uploads a properties file', function(done) {
        var client = new Pandorabot(options);
        var filepath = __dirname + '/data/olimpia.properties';
        var file = fs.readFileSync(filepath, 'utf-8');

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/properties')
          .put('', file)
          .query( { user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.upload(filepath, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });
    });

    describe('prototype.remove', function() {
      it('removes an aiml file', function(done) {
        var client = new Pandorabot(options);


        nock('https://foobar.pandorabots.com/bot/12345/olimpia/file/test.aiml')
          .delete('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        var filename = 'test.aiml';
        client.remove(filename, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });

      it('removes a set file', function(done) {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/set/test')
          .delete('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        var filename = 'test.set';
        client.remove(filename, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });

      it('removes a properties file', function(done) {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/properties')
          .delete('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        var filename = 'olimpia.properties';
        client.remove(filename, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });
    });

    describe('prototype.getFile', function() {
      it('retrieves an aiml file', function(done) {
        var client = new Pandorabot(options);

        var file = 'test.aiml';

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/file/test.aiml')
          .get('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.getFile(file, function(err, res) {
          if (err) throw err;
          console.log(res);
          expect(res.status).to.equal('ok');
          done();
        });
      });

      it('retrieves a set file', function(done) {
        var client = new Pandorabot(options);

        var file = 'test.set';

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/set/test')
          .get('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.getFile(file, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });

      it('retrieves a properties file', function(done) {
        var client = new Pandorabot(options);

        var file = 'olimpia.properties';

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/properties')
          .get('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.getFile(file, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        });
      });
    });

    describe('prototype.compile', function() {
      it('compiles the bot', function(done) {
        var client = new Pandorabot(options);

        nock('https://foobar.pandorabots.com/bot/12345/olimpia/verify')
          .get('')
          .query({ user_key: client.options.user_key })
          .reply(200, { status: 'ok' });

        client.compile(function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        })
      });
    });

    describe('prototype.talk', function() {
      it('sends a message to the talk api', function(done) {
        var client = new Pandorabot(options);

        var params = {
          user_key: client.options.user_key,
          input: 'hello',
          client_name: 'pb-node-user-001'
        };

        nock('https://foobar.pandorabots.com/talk/12345/olimpia')
          .post('', function(body) {
            return JSON.stringify(body) === JSON.stringify(params);
          })
          .reply(200, { status: 'ok' });

        client.talk({
          input: 'hello',
          client_name: 'pb-node-user-001'
        }, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        })
      });
    });

    describe('prototype.atalk', function() {
      it('sends a message to the atalk api', function(done) {
        var client = new Pandorabot(options);
        var params = {
          user_key: client.options.user_key,
          input: 'hello',
          client_name: 'pb-node-user-001'
        };
        nock('https://foobar.pandorabots.com/atalk/12345/olimpia')
          .post('', function(body) {
            return JSON.stringify(body) === JSON.stringify(params);
          })
          .reply(200, { status: 'ok' });
        client.atalk({
          input: 'hello',
          client_name: 'pb-node-user-001'
        }, function(err, res) {
          if (err) throw err;
          expect(res.status).to.equal('ok');
          done();
        })
      });
    });
  });
});
