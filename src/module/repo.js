/**
 * @file git repo module
 */
const AppError = require('../lib/error');
const repo = require('../lib/repo');

module.export = {
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