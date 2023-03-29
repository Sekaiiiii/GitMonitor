export default {
    render() {
        return (
            <div>
                <p>repoTable 页面</p>
            </div>
        )
    },
    async created() {
        console.log(await window.electronAPI.invoke('mainWindow:getRepoList'));
    }
}