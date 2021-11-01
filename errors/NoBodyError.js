"use strict";

class NoBodyError extends Error {
  constructor(messageId) {
    super(messageId);

    this.messageId = messageId;
    this.name = "NoBodyError";
    this.message = `No body found in message ${this.messageId}`;
  }
}

module.exports = NoBodyError;
