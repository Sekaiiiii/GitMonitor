/**
 * @file git repo module
 */
import AppError from '@/lib/class/AppError';
import repo from '@/lib/repo';

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
    repoDelete: () => {

    },
    /**
     * @function
     */
    repoRename: () => {

    }
}