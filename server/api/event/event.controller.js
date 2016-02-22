/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  update
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Event from './event.model';

// Require the Twilio module and create a REST client
var tw = require('twilio')('AC5a6e91bf7af13473e93bc1ba249c9b65', '9449a92fd3885724a50ed0e27b949e4d');
var moment = require('moment');

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

// Gets a list of Events
export function index(req, res) {
  Event.findAsync({ author: req.user._id })
    .then(respondWithResult(res))
    .catch(handleError(res));
/*
  Event.findAsync({ author: req.user._id, start: {"$gte": req.body.start, "$lt": req.body.end} })
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Gets a single Event from the DB
export function show(req, res) {
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Event in the DB
export function create(req, res) {
  var newEvent = new Event(_.merge({ author: req.user._id }, req.body));
  console.log('http://smartclinik.com/tw.php?paciente=' + encodeURIComponent(newEvent.title)
        + '&medico=' + encodeURIComponent(req.user.name)
        + '&dia=' + moment(newEvent.start).format('D')
        + '&hora=' + moment(newEvent.start).format('hh:mm'));
  //Place a phone call, and respond with TwiML instructions from the given URL
  tw.makeCall({
      to:'+55' + newEvent.phones.mobile, // Any number Twilio can call
      from: '+552140420373', // A number you bought from Twilio and can use for outbound communication
      // A URL that produces an XML document (TwiML) which contains instructions for the call
      url: 'http://smartclinik.com/tw.php?paciente=' + encodeURIComponent(newEvent.title)
        + '&medico=' + encodeURIComponent(req.user.name)
        + '&dia=' + moment(newEvent.start).format('D')
        + '&hora=' + moment(newEvent.start).format('hh:mm')
        + '&id=' + newEvent._id
  }, function(err, responseData) {
      /// This callback is executed when the request completes
      console.log(responseData.from); // outputs "+14506667788"
      if(err) { // Something has gone wrong
        console.log(err);
      } else {

      }
  });

  Event.createAsync(newEvent)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Event in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Event from the DB
export function destroy(req, res) {
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Set the status of a event (confirmed)
export function setStatus(req, res) {
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates({status: true}))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
