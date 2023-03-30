import styles from './RepoTable.module.less';
import tableColumnsStyles from '../../style/table-columns.module.less';

import { ELECTRON_API_CODE } from '@/constants';

export default {
    render() {
        return (
            <div class={styles['repo-table-container']} id="repoTableContainer">
                <a-table
                    style={this.repoTableStyle}
                    class={styles['repo-table']}
                    id="repoTable"
                    dataSource={this.repoList}
                    props={this.repoTableConf}
                    on={this.repoTableEventHandler}
                    scopedSlots={
                        {
                            index: (text, record, index) => {
                                return (<div class={tableColumnsStyles['div-index']}>{++index}</div>)
                            },
                            repoName: (text) => {
                                return (<div class={tableColumnsStyles['div-text']}>{text}</div>)
                            },
                            repoPath: (text) => {
                                return (<div class={tableColumnsStyles['div-text']}>{text}</div>)
                            },
                            repoRemoteAddress: (text) => {
                                return (<div class={tableColumnsStyles['div-text']}>{text}</div>)
                            }
                        }
                    }
                >
                </a-table>
            </div >
        )
    },
    data() {
        return {
            repoList: null,
            repoTableEventHandler: {
                change: this.hdChangeTable
            },
            repoTableStyle: {
                '--tableHeight': undefined
            },
            repoTableConf: {
                loading: false,
                rowKey: 'repoName',
                pagination: {
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    pageSizeOptions: ['10', '20', '40', '100', '1000'],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total) => `共 ${total} 条`
                },
                rowSelection: {
                    selectedRowKeys: [],
                    onChange: this.hdChangeTableRowSelection
                },
                scroll: {
                    y: undefined,
                    x: undefined
                },
                columns: [
                    {
                        ellipsis: true,
                        width: '60px',
                        title: '序号',
                        scopedSlots: {
                            customRender: 'index'
                        }
                    },
                    {

                        ellipsis: true,
                        width: '120px',
                        title: '仓库名',
                        dataIndex: 'repoName',
                        scopedSlots: {
                            customRender: 'repoName'
                        }
                    },
                    {

                        ellipsis: true,
                        width: '300px',
                        title: '仓库路径',
                        dataIndex: 'repoPath',
                        scopedSlots: {
                            customRender: 'repoPath'
                        }
                    },
                    {

                        ellipsis: true,
                        width: '300px',
                        title: '仓库地址',
                        dataIndex: 'repoRemoteAddress',
                        scopedSlots: {
                            customRender: 'repoRemoteAddress'
                        }
                    },
                    {

                        ellipsis: true,
                        width: '100px',
                        title: '操作',
                        scopedSlots: {
                            customRender: 'operation'
                        }
                    }
                ]
            }
        }
    },
    computed: {

    },
    async created() {
        await this.async_invokeElectronAPI_getRepoList();
    },
    mounted() {
        const repoTableContainerDom = document.getElementById('repoTableContainer');
        const repoTableHeaderDom = document.querySelector('.ant-table .ant-table-thead');
        const waitDomMountedFunc = (cb) => {
            const repoTablePaginationDom = document.querySelector('#repoTable .ant-table-pagination.ant-pagination');
            if (!repoTablePaginationDom) {
                setImmediate(() => {
                    waitDomMountedFunc(cb);
                })
            } else {
                cb(repoTablePaginationDom);
            }
        }
        waitDomMountedFunc((dom) => {
            const SAFE_DISTANCE = 10;
            const tableHeight = repoTableContainerDom.offsetHeight - dom.offsetHeight - SAFE_DISTANCE;
            this.repoTableStyle['--tablePaginationMargin'] = '0';
            this.repoTableStyle['--tableHeight'] = `${tableHeight}px`;
            this.repoTableConf.scroll.y = tableHeight - repoTableHeaderDom.offsetHeight - SAFE_DISTANCE;
        })
    },
    methods: {
        hdChangeTable(pagination) {
            console.log(pagination);
            this.repoTableConf.pagination.current = this.$set(this.repoTableConf.pagination, 'current', pagination.current);
            this.repoTableConf.pagination.pageSize = this.$set(this.repoTableConf.pagination, 'pageSize', pagination.pageSize);
        },
        hdChangeTableRowSelection(selectedRowKeys) {
            this.repoTableConf.rowSelection.selectedRowKeys = selectedRowKeys;
        },
        async async_invokeElectronAPI_getRepoList() {
            try {
                this.repoTableConf.loading = true;
                const apiRes = await window.electronAPI.invoke('mainWindow:getRepoList');
                if (apiRes?.code === ELECTRON_API_CODE.FAILED) {
                    throw new Error(apiRes?.errorMsg);
                }
                this.repoList = apiRes.data;
            } catch (err) {
                err?.message && this.$message.error(err?.message);
            } finally {
                this.repoTableConf.loading = false;
            }
        }
    }
}