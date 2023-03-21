/**
 * @file git operation lib
 */
const logger = require('../util/logger');
const path = require('node:path');
const fs = require('node:fs/promises');
const { spawn } = require('node:child_process');

/**
 * @function
 */
const isGitRepo = async (path) => {
    try {
        await fs.opendir(path);
        await new Promise((resolve, reject) => {
            const gitLogCommand = spawn('git', ['log'], {
                cwd: path
            },)
            gitLogCommand.stdout.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitLogCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitLogCommand.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject();
                }
            })
        })
        return true;
    } catch (err) {
        if (err) {
            logger.error(__stack, err);
        }
        return false;
    }
}

module.exports = {
    isGitRepo
}