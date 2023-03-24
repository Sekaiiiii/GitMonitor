/**
 * @file logger util
 */
import { LOGGER_FILE_PATH } from '@/constant';
import log4js from 'log4js';

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



log4js.configure({
    appenders: {
        console: { type: "console" },
        app: { type: "file", filename: LOGGER_FILE_PATH }

    },
    categories: {
        default: { appenders: ["console", "app"], level: "debug" },
    }
})

const logger = log4js.getLogger()

export default logger;