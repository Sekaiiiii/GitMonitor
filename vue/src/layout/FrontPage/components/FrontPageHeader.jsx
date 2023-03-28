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
            </div>
        )
    },
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
        this.$route.match
    },
    methods: {

    }
}