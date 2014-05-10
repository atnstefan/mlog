// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var domain = require('domain');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function createConnection() {
  this.domain.run(function() {
    this.connection = mongoose.createConnection(this.connectionUrl);

    this.logSchema = new Schema({
      timestamp: Schema.Types.Mixed,
      level: Schema.Types.Mixed,
      message: Schema.Types.Mixed,
      stack: Schema.Types.Mixed
    }, {
      versionKey: false
    });

    this.logSchema.index({timestamp: -1, level:-1});

    this.logModel = this.connection.model('Log', this.logSchema);
  }.bind(this));
}

function attemptReconnect() {
  this.numberOfFailedLogs++;

  if (this.numberOfFailedLogs >= 10) {
    createConnection.apply(this);
    this.numberOfFailedLogs = 0;
  }
}

var MongoDBLogger = exports = module.exports = function MongoDBLogger(config) {
  this.numberOfFailedLogs = 0;
  this.connectionUrl = 'mongodb://' + (config.host || 'localhost') + '/' + (config.db || 'logs');

  this.domain = domain.create();
  this.domain.on('error', attemptReconnect.bind(this));

  createConnection.apply(this);
};

MongoDBLogger.prototype = {
  write: function(timestamp, levelString, level, message, stack) {
    if (this.connection.readyState == 1) {
      var entry = {
        timestamp: timestamp,
        level: level,
        message: message,
        stack: stack
      };

      this.logModel.create(entry);
    }
    else {
      attemptReconnect.call(this);
    }
  },
  close: function() {
    this.connection.close();
  }
};
