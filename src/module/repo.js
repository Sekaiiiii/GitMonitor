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
            await repo.listRepo()
        } catch (err) {
            if (err instanceof AppError) {
                throw
            }
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