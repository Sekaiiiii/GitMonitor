import styles from './styles.module.less';

export default {
    name: "FrontPage",
    render() {
        return (
            <a-layout class={styles['base-layout']}>
                <a-layout-sider>Sider</a-layout-sider>
                <a-layout>
                    <a-layout-header>Header</a-layout-header>
                    <a-layout-content>Content</a-layout-content>
                    <a-layout-footer>Footer</a-layout-footer>
                </a-layout>
            </a-layout>
        )
    }
}