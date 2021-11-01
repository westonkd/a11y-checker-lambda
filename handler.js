"use strict";

const NoBodyError = require("./errors/NoBodyError");
const htmlFor = require("./htmlFor");
const Logger = require("./Logger");
const jsdom = require("jsdom");
const fs = require('fs')

const logger = new Logger()
const { JSDOM } = jsdom;

module.exports.scan = async (event) => {
  const { window } = new JSDOM(``, { runScripts: "dangerously" });
  const myLibrary = fs.readFileSync("./browser/tiny-mce-a11y-checker/node-checker.js", { encoding: "utf-8" });
  const scriptEl = window.document.createElement("script");
  scriptEl.textContent = myLibrary;
  window.document.body.appendChild(scriptEl);


  try {
    event.Records.forEach((record) => {
      if (!record.body) throw new NoBodyError(record.messageId);

      const html = htmlFor(JSON.parse(record.body))
      console.log(window.checkNode)
    });
  } catch (error) {
    logger.warn(error);
  }
};
