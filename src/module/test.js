/**
 * @file develop test module to load
 */
import logger from '@/util/logger';
import git from '@/lib/git';
import repo from '@/lib/repo';
import AppError from '@/lib/class/AppError';
import path from 'node:path';
import fs from 'node:fs/promises';
import ERROR_CONSTANT from '@/constant/error';
import moment from 'moment';
import { REPO_DIR_NAME, REPO_DIR_PATH } from '@/constant';

export default {
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
        logger.debug(await git.getBranchLog(repoPath, { branchName: 'main', isRemote: true }));
        // logger.debug(await git.isGitRepo(path.join(REPO_DIR_PATH, repoName)))
        // logger.debug(await git.isGitRepo(path.join(REPO_DIR_PATH, 'programCreateRepo224809')))
        // logger.debug(await git.isGitRepo(path.join(REPO_DIR_PATH, 'noexist')))
        // await git.isGitRepoCanLog(path.join(REPO_DIR_PATH, repoName));
    }
}