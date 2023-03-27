import styles from './styles.module.less';
import FrontPageMenu from './components/FrontPageMenu';
import FrontPageHeader from './components/FrontPageHeader';
export default {
    name: "FrontPage",
    render() {
        return (
            <a-layout class={styles['base-layout']} >
                <a-layout-sider class={styles['sider-layout']} theme="light"><FrontPageMenu /></a-layout-sider>
                <a-layout class={styles['base-layout']}>
                    <a-layout-header
                        class={styles['header-layout']}
                    ><FrontPageHeader /></a-layout-header>
                    <a-layout-content class={styles['content-layout']} ><RouterView></RouterView></a-layout-content>
                </a-layout>
            </a-layout >
        )
    }
}