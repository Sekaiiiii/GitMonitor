/**
 * @file git repo module
 */
import { REPO_DIR_PATH } from '@/constant';
import AppError from '@/lib/class/AppError';
import repo from '@/lib/repo';
import logger from '@/util/logger';
import path from 'node:path'
export default {
    /**
     * @function
     */
    repoList: async () => {
        try {
            return await repo.listRepo();
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            logger.error(err);
            throw err;
        }
    },

    /**
     * @function
     */
    repoInit: async (repoName, repoRemoteAddress) => {
        try {
            return await repo.createRepo(repoRemoteAddress, repoName);
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            logger.error(err);
            throw err;
        }
    },

    /**
     * @function
     */
    repoDelete: async (repoName) => {
        try {
            return await repo.deleteRepo(path.join(REPO_DIR_PATH, repoName));
        } catch (err) {
            if (err instanceof AppError) {
                throw err;
            }
            logger.error(err);
            throw err;
        }
    }
}