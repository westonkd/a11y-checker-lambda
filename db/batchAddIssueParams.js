const issue = require("./issue");

function batchAddIssueParams(issues, eventBody) {
  return {
    RequestItems: {
      "dev-issues": issues.map((iss) => issue(iss, eventBody)),
    },
  };
}

module.exports = batchAddIssueParams;
