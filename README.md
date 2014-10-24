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
pb.createBot(options, function(data) {
  console.log(data);
});
```

List all bots
-------------

```javascript
pb.listBots(options, function(data) {
  console.log(data);
});
```

Delete a bot
------------

```javascript
pb.deleteBot(options, function(data) {
  console.log(data);
});
```

Compile a bot
-------------

```javascript
pb.compileBot(options, function(data) {
  console.log(data);
});
```

Upload a file
-------------

```javascript
options.filetype = FILE_TYPE;
options.filepath = PATH_TO_FILE;
options.filename = NAME_OF_FILE;

pb.uploadFile(options, function(data) {
  console.log(data);
});
```

List all files
--------------

```javascript
pb.listFiles(options, function(data) {
  console.log(data);
});
```

Delete a file
-------------

```javascript
options.filetype = FILE_TYPE;
options.filepath = PATH_TO_FILE;
options.filename = NAME_OF_FILE;

pb.deleteFile(options, function(data) {
  console.log(data);
});
```

Talk to a bot
-------------

```javascript
options.q.input = YOUR_INPUT;
// Pass in client_name if your application manages ids for end users
// options.q.client_name = CLIENT_NAME

pb.talk(options, function(data) {
  console.log(data);
});
```

