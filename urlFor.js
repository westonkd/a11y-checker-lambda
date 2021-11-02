const EVENT_TYPES = require('./eventTypes');
const UnknownEventTypeError = require('./errors/UnknownEventTypeError');

function urlFor(eventBody) {
  const { metadata } = eventBody;
  const {body} = eventBody;

  const baseUrl = `https://${metadata.hostname}`;
  const query = `?open_a11y_checker=true`;

  switch (metadata.event_name) {
    case EVENT_TYPES.PAGE_CREATED:
      return `${baseUrl}/courses/${metadata.context_id}/pages/${body.wiki_page_id}/edit${query}`;
    case EVENT_TYPES.ASSIGNMENT_CREATED:
      return "";
    default:
      throw new UnknownEventTypeError(event.metadata.event_name);
  }
}

module.exports = urlFor;