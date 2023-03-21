/**
 * @file main module to load
 */
const logger = require('../util/logger');

module.exports = {
    run: () => {
        logger.debug('main run');
    }
}