const batchAddIssueParams = require("./batchAddIssueParams");
const { BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient.js");

function writeIssues(issues, eventBody, logger) {
  ddbClient
    .send(new BatchWriteItemCommand(batchAddIssueParams(issues, eventBody)))
    .then((data) => {
      logger.log(data)
    })
    .catch((error) => {
      logger.warn(error)
    });
}

module.exports = writeIssues;
