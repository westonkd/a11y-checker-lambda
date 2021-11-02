const batchAddIssueParams = require("./batchAddIssueParams");
const { BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient.js");

function writeIssues(issues, eventBody, logger) {

  console.log(JSON.stringify(batchAddIssueParams(issues, eventBody), null, 2))
  ddbClient
    .send(new BatchWriteItemCommand(batchAddIssueParams(issues, eventBody)))
    .then((data) => {
      logger.log(JSON.stringify(data, null, 2))
    })
    .catch((error) => {
      logger.warn(error)
    });
}

module.exports = writeIssues;
