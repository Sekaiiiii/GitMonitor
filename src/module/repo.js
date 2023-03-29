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
            return await repo.listRepo()
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
    repoInit: () => {

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