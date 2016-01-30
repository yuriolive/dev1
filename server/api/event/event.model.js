'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var validate = require('mongoose-validator');

// Object defining the dates
var dateStampSchema = {
  startDate: {type:Date},
  endDate: {type:Date}
};


/**
 * Validations
 */
var dateValidator = [
  validate({
    validator: function(date) {
      return date.ends > date.starts;
    },
    message: 'A data de término do evento deve ser maior que a data de início'
  })
];


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
  date: {
    type: dateStampSchema, 
    validate: dateValidator,
    required: true
  },
  note: String
});

export default mongoose.model('Event', EventSchema);
