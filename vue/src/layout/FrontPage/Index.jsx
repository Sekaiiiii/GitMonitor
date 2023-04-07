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
                    <a-layout-content class={styles['content-layout']} >
                        {
                            this.routerViewRenderFlag && this.pageLoadingFlag ?
                                <div class={styles['content-layout-loading-mask']}>
                                    <div class={styles['content-layout-loading-container']}>
                                        <a-spin spinning={true}></a-spin>
                                    </div>
                                </div> : null
                        }
                        <div class={styles['content-layout-container']}>
                            {this.routerViewRenderFlag ? <RouterView></RouterView> : null}
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-layout >
        )
    },
    data() {
        return {
            routerViewRenderFlag: true,
            pageLoadingSet: {}
        }
    },
    computed: {
        pageLoadingFlag() {
            return Object.keys(this.pageLoadingSet).length ? true : false;
        }
    },
    provide() {
        return {
            reload: this.reload,
            openPageLoading: this.openPageLoading,
            closePageLoading: this.closePageLoading
        }
    },
    methods: {
        reload() {
            this.routerViewRenderFlag = false;
            this.$nextTick(() => {
                this.routerViewRenderFlag = true;
            })
        },
        openPageLoading() {
            const instance = new Object();
            this.pageLoadingSet[instance] = true;
            this.pageLoadingSet = Object.assign({}, this.pageLoadingSet);
            return instance;
        },
        closePageLoading(instance) {
            delete this.pageLoadingSet[instance];
            this.pageLoadingSet = Object.assign({}, this.pageLoadingSet);
        }
    }

}