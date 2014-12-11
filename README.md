pb-node
=======

Pandorabots API module for Node.js. Please read the [documentation](http://developer.pandorabots.com/docs) for further information regarding naming conventions and file types.

You will need both a `user_key` and `app_id`, which you can register for at the [Pandorabots Developer Portal](http://developer.pandorabots.com).

Installation
------------

```
npm install pb-node
```

Setup
-----

Require pb-node and declare your options:

```javascript
var pb = require('pb-node');

var options = {
  host: 'aiaas.pandorabots.com',
  app_id: YOUR_APP_ID,
  botname: YOUR_BOTNAME,
  q: {
    user_key: YOUR_USER_KEY
  }
}
```

Create a bot
------------

```javascript
pb.createBot(options, function(error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

List all bots
-------------

```javascript
pb.listBots(options, function(error, response, body) {
  if (!error && response,statusCode === 200)
    console.log(body);
});
```

Delete a bot
------------

```javascript
pb.deleteBot(options, function(error, response, body) {
  if (!error && response.statusCode === 200)  
    console.log(body);
});
```

Compile a bot
-------------

```javascript
pb.compileBot(options, function(error, response, body) {
  if (!error && response,statusCode === 200)
    console.log(body);
});
```

Upload a file
-------------

```javascript
options.filetype = FILE_TYPE;
options.filepath = PATH_TO_FILE;
options.filename = NAME_OF_FILE;

pb.uploadFile(options, function(error, response, body) {
  if (!error && response.statusCode === 200)  
    console.log(body);
});
```

List all files
--------------

```javascript
pb.listFiles(options, function(error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

Alternatively, you can use this API to return a ZIP archive of all of your bot's files. 

```javascript
options.q.return = true;
options.filename = FILENAME_TO_BE_WRITTEN;
pb.listFiles(options, function(message) {
  console.log(message);
});
```

Get a single file
-----------------

```javascript
options.filetype = FILE_TYPE;
options.filepath = PATH_TO_FILE;
options.filename = NAME_OF_FILE;

pb.getFile(options, function(error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

Delete a file
-------------

```javascript
options.filetype = FILE_TYPE;
options.filepath = PATH_TO_FILE;
options.filename = NAME_OF_FILE;

pb.deleteFile(options, function(error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

Talk to a bot
-------------

```javascript
options.q.input = YOUR_INPUT;
// Pass in client_name if your application manages ids for end users
// options.q.client_name = CLIENT_NAME

pb.talk(options, function(error, response, body) {
  if (!error && response.statusCode === 200)
    console.log(body);
});
```

