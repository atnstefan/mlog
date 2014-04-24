// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var fmt = require('util').format;

var Logger = exports = module.exports = function Logger(config) {
  var level = config.level;

  if (typeof level == 'string') {
    level = exports.level[level.toUpperCase()];
  }

  this.level = isFinite(level) ? level : this.DEBUG;
  this.loggers = [];

  for (var loggerName in config.loggers) {
    var loggerConfig = config.loggers[loggerName];
    var LoggerClass = exports.loggers[loggerName];

    if (LoggerClass) {
      this.loggers.push(new LoggerClass(loggerConfig));
    }
  }

  if (this.loggers.length === 0) {
    this.loggers.push(new exports.loggers.console());
  }
};

exports.loggers = {
  'null': require('./null'),
  console: require('./console'),
  mongodb: require('./mongodb'),
  riak: require('./riak')
};

exports.level = {
  EMERGENCY: 0,
  ALERT: 1,
  CRITICAL: 2,
  ERROR: 3,
  WARNING: 4,
  NOTICE: 5,
  INFO: 6,
  DEBUG: 7
};

Logger.prototype = {
  log: function(levelStr, args) {
    if (exports.level[levelStr] <= this.level && args && args.length > 0) {
      var msg = args[0];

      if (args.length > 1) {
        msg = fmt.apply(null, args);
      }

      var timestamp = new Date();
      var stack = '';

      if (exports.level[levelStr] <= exports.level.ERROR) {
        stack = new Error().stack;
      }

      this.loggers.forEach(function(logger) {
        logger.write(timestamp, levelStr, exports.level[levelStr], msg, stack);
      });
    }
  },
  close: function() {
    this.loggers.forEach(function(logger) {
      logger.close();
    });
  },
  emergency: function() {
    this.log('EMERGENCY', arguments);
  },
  alert: function() {
    this.log('ALERT', arguments);
  },
  critical: function() {
    this.log('CRITICAL', arguments);
  },
  error: function() {
    this.log('ERROR', arguments);
  },
  warning: function() {
    this.log('WARNING', arguments);
  },
  notice: function() {
    this.log('NOTICE', arguments);
  },
  info: function() {
    this.log('INFO', arguments);
  },
  debug: function() {
    this.log('DEBUG', arguments);
  }
};
