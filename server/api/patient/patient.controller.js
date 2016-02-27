/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/patients              ->  index
 * POST    /api/patients              ->  create
 * GET     /api/patients/:id          ->  show
 * PUT     /api/patients/:id          ->  update
 * DELETE  /api/patients/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Patient from './patient.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Patients
export function index(req, res) {
  Patient.findAsync({ author: req.user._id })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Patient from the DB
export function show(req, res) {
  Patient.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Patient in the DB
export function create(req, res) {
  var newPatient = new Patient(_.merge({ author: req.user._id }, req.body));
  Patient.createAsync(newPatient)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Patient in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Patient.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Patient from the DB
export function destroy(req, res) {
  Patient.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Deletes a Patient from the DB
export function destroyBulk(req, res) {
  var bulkRes;
  req.body.forEach(function(patient) {
    Patient.findByIdAsync(patient._id)
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res)); 
  });
}