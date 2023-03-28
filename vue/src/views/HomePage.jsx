import homeStyles from './home.module.less';

export default {
    render() {
        return (
            <div class={homeStyles['home']}>
                <div class={homeStyles['home-artical']}>
                    <h1>Git Monitor Tool</h1>
                    <p>Git分支的一个监控工具，提供了仓库管理，监控任务管理，监控日志查看的功能,后续该工具应该会往本地自动化脚本管理工具研发，支持基于JS语言的任务配置，部署，重载等</p>
                    <h2>仓库管理</h2>
                    <p>仓库管理主要功能包括</p>
                    <ul>
                        <li>
                            在App隔离的环境内自动创建Git仓库，与远程Git建立联系
                        </li>
                        <li>
                            查看App管理的仓库列表
                        </li>
                        <li>
                            删改App管理的仓库
                        </li>
                    </ul>
                    <h2>任务管理</h2>
                    <p>任务管理主要功能包括</p>
                    <ul>
                        <li>
                            查看App运行的自动化任务
                        </li>
                        <li>
                            App运行的自动化任务启停
                        </li>
                        <li>
                            App运行的自动化任务增删改
                        </li>
                    </ul>
                    <h2>日志管理</h2>
                    <p>
                        日志管理主要功能包括
                    </p>
                    <ul>
                        <li>实时日志监控</li>
                        <li>历史日志查询</li>
                        <li>.....</li>
                    </ul>
                </div>
            </div>
        )
    }
}