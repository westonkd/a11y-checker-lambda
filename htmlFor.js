"use strict";

const UnknownEventTypeError = require("./errors/UnknownEventTypeError");

const EVENT_TYPES = {
  PAGE_CREATED: "wiki_page_created",
  PAGE_UPDATED: "wiki_page_updated",
  ASSIGNMENT_CREATED: "assignment_created",
  ASSIGNMENT_UPDATED: "assignment_updated",
};

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
