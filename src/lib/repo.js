/**
 * @file git repo lib
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const git = require('./git');

const { RESOURCE_DIR_PATH } = require('../constant');

const REPO_DIR_NAME = 'repo';
const REPO_DIR_PATH = path.join(RESOURCE_DIR_PATH, REPO_DIR_NAME);

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
        const res = { data: [] };
        const dir = await fs.opendir(REPO_DIR_PATH);
        for await (const dirent of dir) {
            if (dirent.isDirectory()) {
                const repoPath = path.join(REPO_DIR_PATH, dirent.name);
                if (await git.isGitRepo(repoPath)) {
                    console.log(`listRepo:[${repoPath}] is Git Repo`)
                } else {
                    console.log(`listRepo:[${repoPath}] isn't Git Repo`)
                }
            }
        }
    } catch (err) {

    }
}

module.exports = {
    REPO_DIR_NAME,
    initRepoResource,
    listRepo
}
