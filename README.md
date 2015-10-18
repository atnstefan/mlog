mlog
====

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]



## Installation

via npm:

    $ npm install mlog

## Log Providers

1. Console
2. Mongo
3. Null


## Configuration

With default provider configuration:

```javascript
var logConfiguration = {
    "level": "INFO",
    "loggers": {
        "console": true
    }
}
```

To override default provider configuration:

```javascript
var logConfiguration = {
    "level": "INFO",
    "mongodb": {
        "db": "logdatabase",
        "host": "loghost"
    }
}
```

With multiple providers:
```javascript
var logConfiguration = {
    'level': 'INFO',
    'loggers': {
        'mongodb': true,
        'console': true
    }
}
````


## Full Example

```javascript
var logger = require('mlog');

var logConfiguration = {
  "level": "INFO",
  "loggers": {
    "console": true
  }
};

var log = new logger(logConfiguration);

log.info('Test info log');
log.error('Test error log with stack trace');
```

## License

```
The MIT License (MIT)

Copyright (c) 2014 Stefan Negrea

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```



[npm-url]: https://npmjs.org/package/mlog
[npm-image]: http://img.shields.io/npm/v/mlog.svg
[downloads-image]: http://img.shields.io/npm/dm/mlog.svg

[travis-url]: https://travis-ci.org/snegrea/mlog
[travis-image]: https://travis-ci.org/snegrea/mlog.svg
