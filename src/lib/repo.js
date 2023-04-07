/**
 * @file git repo lib
 */

import git from '@/lib/git';
import logger from '@/util/logger';
import path from 'node:path';
import RepoInfo from '@/lib/class/RepoInfo';
import fs from 'node:fs/promises';
import AppError from '@/lib/class/AppError';
import ERROR_CONSTANT from '@/constant/error';
import { RESOURCE_DIR_PATH, REPO_DIR_NAME, REPO_DIR_PATH } from '@/constant';

/**
 * @function initRepoResource
 * @desc init repo resource dir
 */
const initRepoResource = async () => {
    let dir
    try {
        dir = await fs.opendir(REPO_DIR_PATH);
    } catch (err) {
        await fs.mkdir(REPO_DIR_PATH, { recursive: true });
    } finally {
        await dir?.close?.();
    }
}

/**
 * @function listRepo
 * @desc list repo in repo dir
 */
const listRepo = async () => {
    let dir;
    try {
        const repoList = [];
        dir = await fs.opendir(REPO_DIR_PATH);
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
        if (err instanceof AppError) {
            throw err;
        }
        logger.error(err);
        return [];
    } finally {
        await dir?.close?.()
    }
}

/**
 * @function createRepo
 * @desc create repo in repo dir
 */
const createRepo = async (repoRemoteAddress, repoName) => {
    let dir;
    try {
        dir = await fs.opendir(path.join(REPO_DIR_PATH))
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
        await git.initGitRepo(path.join(REPO_DIR_PATH, repoName));
        await git.addRemoteRepo(path.join(REPO_DIR_PATH, repoName), repoRemoteAddress);
        return true;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        logger.error(err);
        throw err;
    } finally {
        await dir?.close?.();
    }
}

/**
 * @function deleteRepo
 */
const deleteRepo = async (repoPath) => {
    try {
        if (!await git.isGitRepo(repoPath)
        ) {
            throw new AppError({ errorCode: ERROR_CONSTANT.REPO_PATH_NOT_REPO_ERROR });
        }
        await fs.rmdir(repoPath);
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        logger.error(err);
        throw err;
    }
}

export default {
    initRepoResource,
    listRepo,
    createRepo,
    deleteRepo,
}
