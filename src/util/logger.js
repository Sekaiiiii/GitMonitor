/**
 * @file logger util
 */
const log4js = require('log4js');
const { LOGGER_FILE_PATH } = require('../constant');

Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack; };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__file', {
    get: function () {
        return __stack[1].getFileName().split('/').slice(-1)[0];
    }
});

Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, '__logPath', {
    get: function () {
        return `${__file}:${__line}`
    }
})

log4js.configure({
    appenders: {
        out: { type: "stdout" },
        app: { type: "file", filename: LOGGER_FILE_PATH }
    },
    categories: {
        default: { appenders: ["out", "app"], level: "debug" }
    }
})

const logger = log4js.getLogger();



module.exports = logger;