> Note: breaking changes have been introduced in v2.0.0. If you want to old
version, you can still install v1.0.1 from NPM.

# pb-node

Pandorabots API module for Node.js. Please read the [documentation](http://developer.pandorabots.com/docs) for further information regarding naming conventions and file types.

You will need both a `user_key` and `app_id`, which you can register for at the [Pandorabots Developer Portal](http://developer.pandorabots.com).

## Installation

```
$ npm install pb-node
```

## Usage

```
var Pandorabot = require('pb-node');

var options = {
  url: 'https://aiaas.pandorabots.com',
  app_id: **************,
  user_key: ************,
  botname: *************
};

var bot = new Pandorabot(options);
```

## Methods

### List all bots

```
bot.list(function(err, res) {
  if (!err) console.log(res);
});
```

### Create a bot

```
bot.create(function(err, res) {
  if (!err) console.log(res);
});
```

### Delete a bot

```
bot.delete(function(err, res) {
  if (!err) console.log(res);
});
```

### Upload a file

```
var file = './example.aiml';

bot.upload(file, function(err, res) {
  if (!err) console.log(res);
});
```

### Get a file

```
var file = 'example.aiml';

bot.getFile(file, function(err, file) {
  if (!err) console.log(file);
});
```

### Remove a file

```
var file = 'example.aiml';

bot.remove(file, function(err, res) {
  if (!err) console.log(res);
});
```

### Get a bot

```
bot.get(function(err, res) {
  if (!err) console.log(res);
});
```

You can download your bot's files as a .zip by passing `true` as the first parameter:

```
bot.get(true, function(err, res) {
  if (!err) console.log(res);
});
```

### Compile a bot

```
bot.compile(function(err, res) {
  if (!err) console.log(res);
});
```

### Talk

The `input` parameter is required. All others are optional:

```
var talkParams = {
  client_name: YOUR_CLIENT_NAME,
  sessionid: YOUR_SESSION_ID,
  input: YOUR_INPUT,
  extra: BOOLEAN,
  trace: BOOLEAN,
  recent: BOOLEAN
}

bot.talk(talkParams, function (err, res) {
  if (!err) console.log(res);
});
```

### Anonymous talk

Use this API to create a new `client_name`. Then, store this value and pass it in
to future talk requests:

```
bot.atalk({ input: 'hello' }, function(err, res) {
  if (!err) console.log(res);
});
```

## Development

```
$ npm install --development
```

Run tests with mocha:

```
$ npm test
```
