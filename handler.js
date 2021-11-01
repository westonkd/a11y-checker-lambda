"use strict";

const NoBodyError = require("./errors/NoBodyError");
const htmlFor = require("./htmlFor");
const Logger = require("./Logger");
const A11yDocument = require("./A11yDocument")
const checkNode = require("tinymce-a11y-checker/lib/modules/node-checker")

const logger = new Logger()
const a11yDoc = new A11yDocument()

module.exports.scan = async (event) => {
  try {
    event.Records.forEach((record) => {
      if (!record.body) throw new NoBodyError(record.messageId);

      const html = htmlFor(JSON.parse(record.body))
      a11yDoc.setHtml(html)

      console.log(a11yDoc.getHtml());
      console.log(checkNode)
    });
  } catch (error) {
    logger.warn(error);
  }
};
