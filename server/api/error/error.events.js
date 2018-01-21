/**
 * Error model events
 */

'use strict';

import {EventEmitter} from 'events';
var ErrorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ErrorEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Error) {
  for(var e in events) {
    let event = events[e];
    Error.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ErrorEvents.emit(`${event}:${doc._id}`, doc);
    ErrorEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ErrorEvents;
