const jsdom = require("jsdom");
const fs = require("fs");

function windowSetup() {
  const { JSDOM } = jsdom;
  const { window } = new JSDOM(``, { runScripts: "dangerously" });

  const testContentId = "test-content";

  // Set up the node checker script
  const nodeCheckerLib = fs.readFileSync(
    "./browser/dist/checker.js/node-checker.js",
    { encoding: "utf-8" }
  );
  const scriptEl = window.document.createElement("script");
  scriptEl.textContent = nodeCheckerLib;

  // Add a wrapper around content to test
  const testEl = window.document.createElement("div");
  testEl.setAttribute("id", testContentId);
  testEl.setAttribute("style", 'color: #000000;')
  window.document.body.style.color = "#000000"

  window.document.body.appendChild(testEl);
  window.document.body.appendChild(scriptEl);

  return { window, testContentId };
}

module.exports = windowSetup;
