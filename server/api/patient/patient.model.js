'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var validate = require('mongoose-validator');

/**
 * Validations
 */
var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'O nome deve conter de {ARGS[0]} a {ARGS[1]} caracteres'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'O email não é válido'
  })
];

var mobilePhoneValidator = [
  validate({
    validator: 'isNumeric',
    message: 'O telefone deve conter apenas números'
  }),
  validate({
    validator: 'isLength',
    arguments: [10, 11],
    message: 'O telefone celular deve conter de {ARGS[0]} a {ARGS[1]} números, incluindo o DDD'
  })
];

var homePhoneValidator = [
  validate({
    validator: 'isNumeric',
    message: 'O telefone deve conter apenas números'
  }),
  validate({
    validator: 'isLength',
    arguments: [10, 10],
    message: 'O telefone residencial deve conter {ARGS[0]} números, incluindo o DDD'
  })
];



/**
 * Schema
 */
var PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator
  },
  birthday: Date,
  email: {
    type: String,
    required: true,
    validate: emailValidator
  },
  note: String,
  phones: {
    mobile: {
      type: String,
      required: true,
      validate: mobilePhoneValidator
    },
    home: {
      type: String,
      validate: homePhoneValidator
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User',
    required: true
  }
});


/**
 * Methods
 */
PatientSchema.methods = {};

export default mongoose.model('Patient', PatientSchema);