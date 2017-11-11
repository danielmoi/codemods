const logger = require('../../').logger;
const { stub } = require('sinon');

stub(logger, 'info', () => {});

module.exports = logger;
