class Logger {
  constructor(logger = console) {
    this.logger = logger;
  }

  log(...args) {
    this.logger.log(...args);
  }

  info(...args) {
    this.logger.info(...args);
  }

  warn(...args) {
    this.logger.warn(...args);
  }
}

module.exports = Logger;
