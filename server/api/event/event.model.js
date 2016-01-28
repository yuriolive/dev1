'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var EventSchema = new mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref:  'User'
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref:  'Patient'
  },
  data: {
    start:  Date,
    end:    Date
  },
  note: String
});

export default mongoose.model('Event', EventSchema);
