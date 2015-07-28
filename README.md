# nachos-api 

API to interact with nachos core

<table>
  <thead>
    <tr>
      <th>Linux</th>
      <th>OSX</th>
      <th>Windows</th>
      <th>Coverage</th>
      <th>Dependencies</th>
      <th>DevDependencies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2" align="center">
        <a href="https://travis-ci.org/nachos/nachos-api"><img src="https://img.shields.io/travis/nachos/nachos-api.svg?style=flat-square"></a>
      </td>
      <td align="center">
        <a href="https://ci.appveyor.com/project/nachos/nachos-api"><img src="https://img.shields.io/appveyor/ci/nachos/nachos-api.svg?style=flat-square"></a>
      </td>
      <td align="center">
<a href='https://coveralls.io/r/nachos/nachos-api'><img src='https://img.shields.io/coveralls/nachos/nachos-api.svg?style=flat-square' alt='Coverage Status' /></a>
      </td>
      <td align="center">
        <a href="https://david-dm.org/nachos/nachos-api"><img src="https://img.shields.io/david/nachos/nachos-api.svg?style=flat-square"></a>
      </td>
      <td align="center">
        <a href="https://david-dm.org/nachos/nachos-api#info=devDependencies"><img src="https://img.shields.io/david/dev/nachos/nachos-api.svg?style=flat-square"/></a>
      </td>
    </tr>
  </tbody>
</table>

## Have a problem? Come chat with us!
[![Join the chat at https://gitter.im/nachos/nachos-api](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nachos/nachos-api?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation
``` bash
$ [sudo] npm install nachos-api --save
```

## Usage
#### Initialization
``` js
var nachosApi = require('nachos-api');
```

### Custom events
#### on(packageName, callback)
Register custom events
``` js
nachosApi.on('your-package', function () {
  // Code to execute on event custom.your-package
});
```

#### emit(packageName, data)
Emit custom event
``` js
nachosApi.emit('your-package', { ... }); // -> emits custom.your-package with the sent data
```

#### removeListener(packageName, callback)
Remove event listener
``` js
nachosApi.removeListener('your-package', cb);  // cb -> The callback used on registration
```

### Settings
#### Example
``` js
nachosApi.settings('your-package')
  .save({ ... })
  .then(function () {
    // Saved data successfully
  });
```
See [settings-file](https://github.com/nachos/settings-file) documentation to see list of available functions

### Server
#### Examples
``` js
nachosApi.server.users.me()
  .then(function (user) {
    // user -> your user data
  });
```
See [server-api](https://github.com/nachos/server-api) documentation to see list of available functions

### System
#### open(data)
``` js
nachosApi.system.open('path/to/file')
  .then(function () {
    // Opened successfully
  });
```
## Run Tests
``` bash
$ npm test
```

## License
[MIT](LICENSE)
