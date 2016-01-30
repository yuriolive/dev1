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
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'O nome deve conter somente caracteres alfa-numéricos'
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
    arguments: [9, 10],
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
    arguments: [9, 9],
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
  sex: Boolean, // 0 -> men / 1 -> women
  email: {
    type: String,
    required: true,
    validate: emailValidator
  },
  note: String,
  phones: {
    mobile: {
      type: Number,
      required: true,
      validate: mobilePhoneValidator
    },
    home: {
      type: Number,
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