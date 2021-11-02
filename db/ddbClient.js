// Create service client module using ES6 syntax.
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// Set the AWS Region.
const REGION = "us-west-2";

const ddbClient = new DynamoDBClient({ region: REGION });

module.exports = { ddbClient };
