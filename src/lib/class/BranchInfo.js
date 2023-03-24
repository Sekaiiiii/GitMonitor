/**
 * @class
 */
class BranchInfo {
    constructor({ branchName, isRemote = false }) {
        this.branchName = branchName;
        this.isRemote = isRemote
    }
}

export default BranchInfo;