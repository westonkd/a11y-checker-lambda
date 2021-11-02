"use strict";

const NoBodyError = require("./errors/NoBodyError");
const htmlFor = require("./htmlFor");
const Logger = require("./Logger");
const windowSetup = require("./windowSetup");
const writeIssues = require("./db/writeIssues");

const logger = new Logger();
const { window, testContentId } = windowSetup();

module.exports.scan = function (event, _context, callback) {
  try {
    event.Records.forEach((record) => {
      if (!record.body) throw new NoBodyError(record.messageId);

      const parsedBody = JSON.parse(record.body);

      const html = htmlFor(parsedBody);
      window.document.getElementById(testContentId).innerHTML = html;

      function done(results) {
        writeIssues(results, parsedBody, logger);
        callback();
      }

      window.check(window.document.getElementById(testContentId), done);
    });
  } catch (error) {
    logger.warn(error);
    throw error;
  }
};
