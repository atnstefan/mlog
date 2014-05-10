// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var logger = require('../lib/logger');


var logConfiguration = {
  'level': 'INFO',
  'loggers': {
    'mongodb': true,
    //added here for visual feedback
    'console': true,
    'riak': false
  }
};

var log = new logger(logConfiguration);

setInterval(function() {
  log.info('Test info log');
}, 1000);

setInterval(function() {
  log.error('Test error log with stack trace');
}, 1000);