"use strict";

class UnknownEventTypeError extends Error {
  constructor(eventType) {
    super(eventType);

    this.name = "UnknownEventTypeError";
    this.message = `Unknown event type: ${eventType}`;
  }
}

module.exports = UnknownEventTypeError;
