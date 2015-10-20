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
    'console': true
  }
};

var log = new logger(logConfiguration);

//create logs
setInterval(function() {
  log.info('Test info log');
}, 1000);

setInterval(function() {
  log.error('Test error log with stack trace');
}, 1000);

//sample query from database
//this will use the mongodb connection already established by the logger
setInterval(function() {
  var mongodbLogger = log.getLoggers().mongodb;
  mongodbLogger.model().find().exec()
  .then(function(results){
    console.log(results);
  });
}, 2000);
