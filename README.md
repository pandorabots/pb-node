pb-node
=======

Pandorabots API module for Node.js. Please read the [documentation](http://developer.pandorabots.com/docs).

Installation
------------

Setup
-----

Require pb-node and declare your options:

```javascript
var pb = require('../lib/pandorabots.js');

var options = {
  host: 'aiaas.pandorabots.com',
  username: YOUR_USERNAME,
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
  if (error) {
    console.log(error);
  } else {
    console.log(body);  
  }
});
```

Upload a file
-------------

```javascript
options.filetype = FILE_TYPE;
options.filepath = PATH_TO_FILE;
options.filename = NAME_OF_FILE;

pb.uploadFile(options, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);  
  }
});
```

Compile a bot
-------------

```javascript
pb.compileBot(options, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});
```

Talk to a bot
-------------

```javascript
options.q.input = YOUR_INPUT;

pb.talk(options, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});
```

Delete a bot
------------

```javascript
pb.deleteBot(options, function(error, response, body) {
  if (error) {
    console.log(error);
  } else {
    console.log(body);
  }
});
```

