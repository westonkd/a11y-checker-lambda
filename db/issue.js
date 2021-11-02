const { v4: uuidv4 } = require('uuid');

function issue(issueObject, eventBody) {
  const { metadata } = eventBody;
  const { root_account_uuid } = metadata;

  return {
    PutRequest: {
      Item: {
        AccountUUID: { S: root_account_uuid },
        IssueID: { S: uuidv4() },
        Context: { S: `${root_account_uuid}::${metadata.context_type}::${metadata.context_id}`},
        CreatedAt: { S: new Date().toISOString() },
        Type: { S: issueObject.rule.id },
        Resource: { S: "todo" }
      }
    }
  };
}

module.exports = issue;
