// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var RiakLogger = exports = module.exports = function RiakLogger(config) {
  this.db = require('riak-js').getClient();
};

RiakLogger.prototype = {
  write: function(timestamp, levelString, level, message, stack) {
    this.db.save('logs', timestamp, {
      'level': level,
      'message': message,
      'stack': stack
    });
  },
  close: function() {
    // no-op
  }
};
