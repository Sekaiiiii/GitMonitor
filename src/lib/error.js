const ERROR_CONSTANT = require('../constant/error')

/**
 * @class AppError
 */
class AppError extends Error {
    constructor({ errorCode, errorMsg }, ...args) {
        const _errorMsg = errorMsg ?? ERROR_CONSTANT?.[errorCode];
        super(_errorMsg, ...args);
    }

    static isAppError(object) {
        return object instanceof AppError
    }
}

module.exports = AppError;