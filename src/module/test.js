/**
 * @file develop test module to load
 */
const logger = require('../util/logger');
const repo = require('../lib/repo');
module.exports = {
    run: async () => {
        logger.debug('test run');
        logger.debug(await repo.listRepo());
    }
}