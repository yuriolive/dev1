'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var validate = require('mongoose-validator');


/**
 * Validations
 */
/*var dateValidator = [
  validate({
    validator: function(date) {
      return date.endDate > date.startDate;
    },
    message: 'A data de término do evento deve ser maior que a data de início'
  })
];*/

/**
 * Schema
 */
var EventSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'Patient',
    required: true
  },
  phones: {
    mobile: {
      type: String,
      required: true,
    },
    home: {
      type: String
    }
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true    
  },
  status: { // false -> not confirmed / true -> confirmed
    type: Boolean,
    default: false
  },
  note: String
});

EventSchema.pre('validate', function(next) {
    if (this.start > this.end) {
        this.invalidate('start', 'A data de término do evento deve ser maior que a data de início');
        next();
    } else {
        next();
    }
});

export default mongoose.model('Event', EventSchema);
