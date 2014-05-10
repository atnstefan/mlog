// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var logger = require('../lib/logger');


var logConfiguration = {
  "level": "INFO",
  "loggers": {
    "mongodb": {
    },
    //added here for visual feedback
    "console": {
    }
  }
};

var log = new logger(logConfiguration);

setInterval(function(){
  log.info('Test info log');
}, 1000);

log.error('Test error log with stack trace');