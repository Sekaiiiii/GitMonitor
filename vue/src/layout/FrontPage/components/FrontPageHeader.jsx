import { ELECTRON_EVENT_WINDOW_CLOSE, ELECTRON_EVENT_WINDOW_MINIMIZE } from '@/constants/electronEvent';
import styles from '../styles.module.less';

export default {
    render() {
        return (
            <div class={styles['header-container']}>
                <a-breadcrumb class={styles['header-breadcrumb']}>
                    {
                        this.breadcrumbData.map(data => {
                            return (
                                <a-breadcrumb-item><RouterLink to={{ path: data.href }}>{data.name}</RouterLink></a-breadcrumb-item>
                            )
                        })
                    }
                </a-breadcrumb>
                <div class={styles['header-window-btns']}>
                    <a-icon type="reload" onClick={this.hdClickReloadBtn}></a-icon>
                    <a-icon type="minus" onClick={this.hdClickMinusBtn}></a-icon>
                    <a-icon type="close" onClick={this.hdClickCloseBtn}></a-icon>
                </div>
            </div>
        )
    },
    inject: ['reload'],
    data() {
        return {
            breadcrumbData: []
        }
    },
    watch: {
        $route: {
            handler: function (newRoute) {
                this.breadcrumbData = newRoute.matched.filter((matchItem => matchItem.path)).map(matchItem => ({
                    href: matchItem.path,
                    name: matchItem.meta.breadcrumbName
                }))
            },
            immediate: true
        }
    },
    created() {
    },
    methods: {
        hdClickCloseBtn() {
            window.electronAPI.send(ELECTRON_EVENT_WINDOW_CLOSE);
        },
        hdClickMinusBtn() {
            window.electronAPI.send(ELECTRON_EVENT_WINDOW_MINIMIZE);
        },
        hdClickReloadBtn() {
            this.reload();
        }
    }
}