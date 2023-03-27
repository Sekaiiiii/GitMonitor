import styles from '../styles.module.less';

export default {
    render() {
        return (
            <div class={styles['menu-container']}>
                <div class={styles['menu-header']}>
                    <img src="./images/menu-logo.png" class={styles["menu-header-image"]}></img>
                </div>
                <div class={styles['menu-content']}>
                    <a-menu mode="inline" onSelect={this.hdMenuSelect}>
                        <a-sub-menu>
                            <span slot="title">
                                <a-icon type="appstore" /> <span>仓库管理</span>
                            </span>
                            <a-menu-item key='RepoTable'>仓库列表</a-menu-item>
                            <a-menu-item>新增仓库</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu>
                            <span slot="title">
                                <a-icon type="appstore" /> <span>任务管理</span>
                            </span>
                            <a-menu-item>任务列表</a-menu-item>
                            <a-menu-item>新增任务</a-menu-item>
                            <a-menu-item>修改任务</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu>
                            <span slot="title">
                                <a-icon type="appstore" /> <span>日志管理</span>
                            </span>
                            <a-menu-item>实时日志</a-menu-item>
                            <a-menu-item>历史日志</a-menu-item>
                            <a-menu-item>测试工具</a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </div>
            </div>
        )
    },
    methods: {
        hdMenuSelect({ key }) {
            this.$router.push({
                name: key
            })
        }
    }
}