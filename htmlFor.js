const UnknownEventTypeError = require("./errors/UnknownEventTypeError");
const EVENT_TYPES = require('./eventTypes');

function htmlFor(event) {
  switch (event.metadata.event_name) {
    case EVENT_TYPES.PAGE_CREATED:
      return event.body.body;
    case EVENT_TYPES.ASSIGNMENT_CREATED:
      return "";
    default:
      throw new UnknownEventTypeError(event.metadata.event_name);
  }
}

module.exports = htmlFor;
