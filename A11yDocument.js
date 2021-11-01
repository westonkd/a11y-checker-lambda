"use strict";

const jsdom = require("jsdom");

class A11yDocument {
  static id = "event-body";
  static boilerplate = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Page for testing A11y</title>
      <meta name="description" content="A simple page for A11y checking">
    </head>
    <body>
      <span id="${A11yDocument.id}"></span>
    </body>
    </html>
  `;

  constructor() {
    const { JSDOM } = jsdom;
    const { document } = new JSDOM(A11yDocument.boilerplate).window;
    this.document = document;
  }

  testElement() {
    return this.document.getElementById(A11yDocument.id)
  }

  setHtml(html) {
    return this.testElement().innerHTML = html
  }

  getHtml() {
    return this.testElement().innerHTML
  }
}

module.exports = A11yDocument;
