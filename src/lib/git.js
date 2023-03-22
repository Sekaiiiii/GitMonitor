/**
 * @file git operation lib
 */
const logger = require('../util/logger');
const path = require('node:path');
const pathLib = require('node:path');
const fs = require('node:fs/promises');
const AppError = require('./error');
const ERROR_CONSTANT = require('../constant/error');
const { spawn } = require('node:child_process');

class BranchInfo {
    constructor({ branchName, isRemote = false }) {
        this.branchName = branchName;
        this.isRemote = isRemote
    }
}

/**
 * @function
 */
const isGitRepoCanLog = async (path) => {
    try {
        await fs.opendir(path);
        await new Promise((resolve, reject) => {
            const gitLogCommand = spawn('git', ['log', '--oneline', '-n1'], {
                cwd: path
            })
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
        logger.error(err);
        return false;
    }
}

/**
 * @function
 */
const isGitRepo = async (path) => {
    try {
        await fs.opendir(path);
        await fs.opendir(pathLib.join(path, '.git'))
        await new Promise((resolve, reject) => {
            const gitRevParseCommand = spawn('git', ['rev-parse', '--is-inside-work-tree'], {
                cwd: path
            })
            let gitStdoutData;
            gitRevParseCommand.stdout.on('data', (data) => {
                gitStdoutData = data.toString();
                logger.debug(data.toString());
            })
            gitRevParseCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitRevParseCommand.on('close', (code) => {
                if (code === 0 && gitStdoutData?.trim() === 'true') {
                    resolve();
                } else {
                    reject();
                }
            })
        })
        return true;
    } catch (err) {
        logger.debug(err);
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
                reject();
            })
        })
    } catch (err) {
        logger.debug(err);
        return null;
    }
}

/**
 * @function 
 */
const initGitRepo = async (path) => {
    try {
        try {
            await fs.opendir(path);
        } catch (err) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_PATH_NOT_EXIST_ERROR })
        }
        if (await isGitRepo(path)) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_PATH_EXIST_REPO_ERROR })
        }
        await new Promise((resolve, reject) => {
            const gitInitCommand = spawn('git', ['init'], {
                cwd: path
            })
            gitInitCommand.stdout.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitInitCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitInitCommand.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new AppError({ errorCode: ERROR_CONSTANT.GIT_INIT_REPO_ERROR }));
                }
            })
        })
        return true;
    } catch (err) {
        if (AppError.isAppError(err)) {
            throw AppError;
        }
        logger.error(err);
        throw err;
    }
}

/**
 * @function
 * @param {*} path 
 * @param {*} remoteAddress 
 */
const initGitRepoCanLog = async (path, remoteAddress) => {
    try {
        if (!await isGitRepo(path)) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_NOT_INIT_ERROR });
        }
        await addRemoteRepo(path, remoteAddress);
        await fetchRemoteRepo(path);
    } catch (err) {
        if (AppError.isAppError(err)) {
            throw err;
        }
        logger.error(err);
        throw err;
    }
}

/**
 * @function
 */
const addRemoteRepo = async (path, remoteAddress) => {
    try {
        if (!await isGitRepo(path)) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_NOT_INIT_ERROR });
        }
        await new Promise((resolve, reject) => {
            const gitAddRemoteRepoCommand = spawn('git', ['remote', 'add', 'origin', remoteAddress], {
                cwd: path
            })
            gitAddRemoteRepoCommand.stdout.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitAddRemoteRepoCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitAddRemoteRepoCommand.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new AppError({ errorCode: ERROR_CONSTANT.GIT_ADD_REMOTE_REPO_ERROR }));
                }
            })
        })
    } catch (err) {
        if (AppError.isAppError(err)) {
            throw err;
        }
        logger.error(err);
        throw err;
    }
}

/**
 * @function
 */
const fetchRemoteRepo = async (path) => {
    try {
        if (!await isGitRepo(path)) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_NOT_INIT_ERROR });
        }
        await new Promise((resolve, reject) => {
            const gitFetchRemoteRepoCommand = spawn('git', ['fetch', 'origin'], {
                cwd: path
            })
            gitFetchRemoteRepoCommand.stdout.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitFetchRemoteRepoCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitFetchRemoteRepoCommand.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new AppError({ errorCode: ERROR_CONSTANT.GIT_FETCH_ORIGIN_ERROR }))
                }
            })
        })
    } catch (err) {
        if (AppError.isAppError(err)) {
            throw err;
        }
        logger.error(err);
        throw err;
    }
}

/**
 * @function
 */
const getRepoBranch = async (path, { showRemote = true } = {}) => {
    try {
        if (!await isGitRepo(path)) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_NOT_INIT_ERROR });
        }
        return await new Promise((resolve, reject) => {
            const gitBranchCommand = spawn('git', ['branch', showRemote ? '-a' : undefined], {
                cwd: path
            })
            let gitBranchStdoutData;
            gitBranchCommand.stdout.on('data', (data) => {
                logger.debug(data.toString());
                gitBranchStdoutData = data.toString();
            })
            gitBranchCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitBranchCommand.on('close', (code) => {
                if (!code == 0) {
                    reject(new AppError({ errorCode: ERROR_CONSTANT.GIT_BRANCH_ERROR }));
                }
                const returnData = [];
                gitBranchStdoutData?.split(/\n/).map(branchRowData => {
                    const wordArr = branchRowData?.trim()?.split(/\//);
                    if (!wordArr || wordArr?.[0]?.trim() == '') {
                        return;
                    }
                    if (wordArr.length >= 1 && wordArr[0] === 'remotes') {
                        returnData.push(new BranchInfo({
                            branchName: wordArr[wordArr.length - 1],
                            isRemote: true
                        }));
                    } else {
                        returnData.push(new BranchInfo({
                            branchName: wordArr[0]
                        }))
                    }

                })
                resolve(returnData);
            })
        })
    } catch (err) {
        if (AppError.isAppError(err)) {
            throw err;
        }
        logger.error(err);
        throw err;
    }
}

module.exports = {
    isGitRepo,
    isGitRepoCanLog,
    getGitRemoteAddress,
    initGitRepo,
    initGitRepoCanLog,
    fetchRemoteRepo,
    addRemoteRepo,
    getRepoBranch
}