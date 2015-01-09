# pb-node

Pandorabots API module for Node.js. Please read the [documentation](http://developer.pandorabots.com/docs) for further information regarding naming conventions and file types.

You will need both a `user_key` and `app_id`, which you can register for at the [Pandorabots Developer Portal](http://developer.pandorabots.com).

## Installation

```
npm install pb-node
```

## Usage

```
var Pandorabot = require('pb-node'),

var botOptions = {
  host: 'aiaas.pandorabots.com',
  app_id: **************,
  user_key: ************,
  botname: *************
};

var pb = new Pandorabot(botOptions);
```

## Methods

### List all bots

```
pb.listBots(function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

### Create a bot

```
pb.createBot(function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

### Delete a bot

```
pb.deleteBot(function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

### Upload a file

```
var params = {
  filename: NAME_OF_FILE,
  filetype: TYPE_OF_FILE,
  filepath: PATH_TO_FILE
};

pb.uploadFile(params, function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

### Delete a file

```
var params = {
  filename: NAME_OF_FILE,
  filetype: TYPE_OF_FILE
}

pb.deleteFile(params, function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

### List or download all files 

```
pb.listFiles(function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

You can download your bot's files as a .zip by passing in the optional parameters:

```
var params = {
  return: 'zip',
  filename: NAME_OF_FILE_TO_WRITE
}

pb.listFiles(params, function (message) {
  console.log(message);
});
```

### Compile a bot

```
pb.compileBot(function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

### Talk to a bot

The `input` param is required. All other params are optional:

```
var params = {
  client_name: YOUR_CLIENT_NAME,
  sessionid: YOUR_SESSION_ID,
  input: YOUR_INPUT,
  extra: BOOLEAN,
  trace: BOOLEAN,
  recent: BOOLEAN
}

pb.talk(params, function (error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```