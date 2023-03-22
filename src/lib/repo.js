/**
 * @file git repo lib
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const git = require('./git');
const logger = require('../util/logger');
const AppError = require('./error');
const ERROR_CONSTANT = require('../constant/error')
const { RESOURCE_DIR_PATH, REPO_DIR_NAME, REPO_DIR_PATH } = require('../constant');
const { dirname } = require('node:path');


/**
 * @class repo info class
 */
class RepoInfo {

    constructor({ repoPath, repoName, repoRemoteAddress } = {}) {
        this.repoPath = repoPath;
        this.repoName = repoName;
        this.repoRemoteAddress = repoRemoteAddress;
    }

}

/**
 * @function initRepoResource
 * @desc init repo resource dir
 */
const initRepoResource = async () => {
    try {
        await fs.opendir(REPO_DIR_PATH);
    } catch (err) {
        await fs.mkdir(REPO_DIR_PATH, { recursive: true });
    }
}

/**
 * @function listRepo
 * @desc list repo in repo dir
 */
const listRepo = async () => {
    try {
        const repoList = [];
        const dir = await fs.opendir(REPO_DIR_PATH);
        for await (const dirent of dir) {
            if (!dirent.isDirectory()) {
                continue;
            }
            const repoPath = path.join(REPO_DIR_PATH, dirent.name);
            if (!await git.isGitRepoCanLog(repoPath)) {
                continue;
            }
            const tempRepoInfo = new RepoInfo();
            tempRepoInfo.repoName = dirent.name;
            tempRepoInfo.repoPath = repoPath;
            tempRepoInfo.repoRemoteAddress = await git.getGitRemoteAddress(repoPath);
            repoList.push(tempRepoInfo);
        }
        return repoList;
    } catch (err) {
        logger.error(err);
        return [];
    }
}

/**
 * @function createRepo
 * @desc create repo in repo dir
 */
const createRepo = async (repoRemoteAddress, repoName) => {
    try {
        const dir = await fs.opendir(path.join(REPO_DIR_PATH))
        const repoCreateDirExistFlag = false;
        for await (const dirent of dir) {
            if (dirent.name === repoName) {
                repoCreateDirExistFlag = true;
                break;
            }
            if (dirent.name === repoName && !dirent.isDirectory()) {
                throw new AppError({ errorCode: ERROR_CONSTANT.REPO_PATH_NOT_DIRECTORY_ERROR });
            }
        }
        if (!repoCreateDirExistFlag) {
            try {
                await fs.mkdir(path.join(REPO_DIR_PATH, repoName))
            } catch (err) {
                logger.error(err);
                throw new AppError({ errorCode: ERROR_CONSTANT.CREATE_REPO_DIR_ERROR });
            }
        }
        await git.initGitRepo(path.join(REPO_DIR_PATH, repoName), repoRemoteAddress);
        return true;
    } catch (err) {
        logger.error(err);
        throw err;
    }
}

module.exports = {
    RepoInfo,
    initRepoResource,
    listRepo,
    createRepo
}
