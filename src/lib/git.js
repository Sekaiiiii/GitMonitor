/**
 * @file git operation lib
 */
import logger from '@/util/logger';
import path from 'node:path';
import pathLib from 'node:path';
import fs from 'node:fs/promises';
import AppError from '@/lib/class/AppError';
import ERROR_CONSTANT from '@/constant/error';
import BranchInfo from '@/lib/class/BranchInfo';
import { spawn } from 'node:child_process';

/**
 * @function
 */
const isGitRepoCanLog = async (path) => {
    try {
        const dir = await fs.opendir(path);
        await dir.close();
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
    let dir, dirGit;
    try {
        dir = await fs.opendir(path);
        dirGit = await fs.opendir(pathLib.join(path, '.git'))
        await new Promise((resolve, reject) => {
            const gitRevParseCommand = spawn('git', ['rev-parse', '--is-inside-work-tree'], {
                cwd: path
            })
            let gitStdoutData;
            gitRevParseCommand.stdout.on('data', (data) => {
                gitStdoutData = data.toString();
            })
            gitRevParseCommand.stderr.on('data', (data) => {
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
    } finally {
        await dir?.close?.();
        await dirGit?.close?.();
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
            const gitRemoteCommandStdoutData = [];
            gitRemoteCommand.stdout.on('data', (data) => {
                const stdOutputStr = data.toString();
                gitRemoteCommandStdoutData.push(stdOutputStr);
            })
            gitRemoteCommand.stderr.on('data', (data) => {
                reject();
            })
            gitRemoteCommand.on('close', (code) => {
                if (code != 0) {
                    reject();
                } else {
                    try {
                        const stdOutputStr = gitRemoteCommandStdoutData[0];
                        const remoteAddress = stdOutputStr.split(/\n/)?.[0]?.split(/\s/)?.[1];
                        if (remoteAddress) {
                            resolve(remoteAddress);
                        } else {
                            reject();
                        }
                    } catch (err) {
                        reject();
                    }
                }
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
        let dir;
        try {
            dir = await fs.opendir(path);
        } catch (err) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_PATH_NOT_EXIST_ERROR })
        } finally {
            await dir?.close?.();
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

/**
 * @function 
 */
const getBranchLog = async (path, { branchName, isRemote }) => {
    try {
        if (!await isGitRepo(path)) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_NOT_INIT_ERROR });
        }
        return new Promise((resolve, reject) => {
            let logParam = branchName ? `${isRemote ? 'origin/' : ''}${branchName}` : '';
            const gitBranchLogCommand = spawn('git', ['log', logParam], {
                cwd: path
            })
            let gitBranchLogStdoutData;
            gitBranchLogCommand.stdout.on('data', (data) => {
                logger.debug(data.toString());
                gitBranchLogStdoutData = data.toString();
            })
            gitBranchLogCommand.stderr.on('data', (data) => {
                logger.debug(data.toString());
            })
            gitBranchLogCommand.on('close', (code) => {
                if (!code == 0) {
                    return reject(new AppError({ errorCode: ERROR_CONSTANT.GIT_LOG_ERROR }));
                }
                resolve(gitBranchLogStdoutData);
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

export default {
    isGitRepo,
    isGitRepoCanLog,
    getGitRemoteAddress,
    initGitRepo,
    initGitRepoCanLog,
    fetchRemoteRepo,
    addRemoteRepo,
    getRepoBranch,
    getBranchLog
}