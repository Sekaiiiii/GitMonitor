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
            })
            gitLogCommand.stdout.on('data', (data) => {
                logger.trace(data.toString());
            })
            gitLogCommand.stderr.on('data', (data) => {
                logger.trace(data.toString());
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

/**
 * @functoin 
 */
const getGitRemoteAddress = async (path) => {
    try {
        if (!await isGitRepo(path)) {
            return null;
        }
        return await new Promise((resolve, reject) => {
            const gitRemoteCommand = spawn('git', ['remote', '-v'], {
                cwd: path
            })
            gitRemoteCommand.stdout.on('data', (data) => {
                try {
                    const stdOutputStr = data.toString();
                    const remoteAddress = stdOutputStr.split(/\n/)?.[0]?.split(/\s/)?.[1];
                    resolve(remoteAddress);
                } catch (err) {
                    reject(err);
                }
            })
            gitRemoteCommand.stderr.on('data', (data) => {
                reject(new Error(''));
            })
        })
    } catch (err) {
        logger.debug(__logPath, err);
        return null;
    }
}

/**
 * 
 */


module.exports = {
    isGitRepo,
    getGitRemoteAddress
}