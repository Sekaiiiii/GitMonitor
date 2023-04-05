import styles from './RepoForm.module.less';
export default {
    render() {
        return (
            <div class={styles['repo-form-container']} id="repoFormContainer">
                <div class={styles['repo-form-form-container']}>
                    <a-form class={styles['repo-form']} form={this.form}>
                        <a-form-item label='仓库名称' labelCol={this.formItemLayout.labelCol} wrapperCol={this.formItemLayout.wrapperCol}>
                            <a-input v-decorator={
                                ["repoName", { rules: [{ required: true, message: '请输入仓库名' }] }]
                            }></a-input>
                        </a-form-item>
                        <a-form-item label='远程仓库地址' labelCol={this.formItemLayout.labelCol} wrapperCol={this.formItemLayout.wrapperCol}>
                            <a-input v-decorator={
                                ["repoRemoteAddress", { rules: [{ required: true, message: '请输入远程仓库地址' }] }]
                            }></a-input>
                        </a-form-item>
                    </a-form>
                    <div class={styles['repo-form-btns']}>
                        <a-button class={styles['repo-form-btn']} type="primary" onClick={this.hdClickAddBtn}>新增</a-button>
                        <a-button class={styles['repo-form-btn']} type="default" onClick={this.hdClickResetBtn}>重置</a-button>
                    </div>
                </div>
            </div>
        )
    },
    data() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return {
            form: this.$form.createForm(this),
            formItemLayout,
        }
    },
    methods: {
        async hdClickAddBtn() {
            let formValues;
            try {
                formValues = await new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(values);
                    })
                })
            } catch (err) { return; }
            console.log(formValues);
        },
        hdClickResetBtn() {
            this.form.setFieldsValue({
                repoName: undefined,
                repoRemoteAddress: undefined
            })
        }
    }
}