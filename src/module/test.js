/**
 * @file develop test module to load
 */
const logger = require('../util/logger');
const git = require('../lib/git');
const repo = require('../lib/repo');
const AppError = require('../lib/error');
const path = require('node:path');
const fs = require('node:fs/promises');
const ERROR_CONSTANT = require('../constant/error');
const moment = require('moment');
const { REPO_DIR_NAME, REPO_DIR_PATH } = require('../constant');
module.exports = {
    run: async () => {
        logger.debug('test run');
        // logger.debug(await repo.listRepo());
        // logger.debug(new AppError({ errorCode: ERROR_CONSTANT.REPO_PATH_EXIST_REPO_ERROR }));
        // await repo.initRepoResource();
        const remoteAddress = 'git@github.com:Sekaiiiii/GitMonitor_TestBranchB.git';
        const repoName = `programCreateRepo${moment().format('HHmmss')}`;
        // await repo.createRepo('git@github.com:Sekaiiiii/GitMonitor_TestBranchB.git', repoName);
        const repoPath = path.join(REPO_DIR_PATH, repoName);
        await fs.mkdir(repoPath);
        await git.initGitRepo(repoPath);
        // git@github.com:Sekaiiiii/GitMonitor_TestBranchB.git
        await git.addRemoteRepo(repoPath, remoteAddress);
        await git.fetchRemoteRepo(repoPath);
        logger.debug(await git.getRepoBranch(repoPath));
        // logger.debug(await git.isGitRepo(path.join(REPO_DIR_PATH, repoName)))
        // logger.debug(await git.isGitRepo(path.join(REPO_DIR_PATH, 'programCreateRepo224809')))
        // logger.debug(await git.isGitRepo(path.join(REPO_DIR_PATH, 'noexist')))
        // await git.isGitRepoCanLog(path.join(REPO_DIR_PATH, repoName));
    }
}