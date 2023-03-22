/**
 * @file git repo lib
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const git = require('./git');
const logger = require('../util/logger');

const { RESOURCE_DIR_PATH } = require('../constant');

const REPO_DIR_NAME = 'repo';
const REPO_DIR_PATH = path.join(RESOURCE_DIR_PATH, REPO_DIR_NAME);

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
            if (!await git.isGitRepo(repoPath)) {
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
        logger.error(__logPath, err);
        return [];
    }
}

/**
 * @function createRepo
 * @desc create repo in repo dir
 */
const createRepo = async (repoRemoteAddress, repoName) => {

}

module.exports = {
    RepoInfo,
    REPO_DIR_NAME,
    initRepoResource,
    listRepo,
    createRepo
}
