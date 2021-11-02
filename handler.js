"use strict";

const NoBodyError = require("./errors/NoBodyError");
const htmlFor = require("./htmlFor");
const Logger = require("./Logger");
const windowSetup = require("./windowSetup");

const logger = new Logger();
const { window, testContentId } = windowSetup()

module.exports.scan = function(event, context, callback) {
  logger.info(event)

  try {
    event.Records.forEach((record) => {
      if (!record.body) throw new NoBodyError(record.messageId);

      const html = htmlFor(JSON.parse(record.body));
      window.document.getElementById(testContentId).innerHTML = html;

      function done(results) {
          console.log(results)
          callback()
      }

      logger.info(html)
      window.check(window.document.getElementById("test-content"), done);
    });
  } catch (error) {
    logger.warn(error);
    callback(error)
  }
};
