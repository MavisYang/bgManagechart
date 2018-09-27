import React,{Component} from 'react';
import './index.css'
import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'
export default class TableList extends Component{
    constructor(props){
        super(props);
        this.state={
            dateArr:[]
        }
    }
    componentDidMount(){
    }


    render(){
        const {data} = this.props
        const columns = [{
            title: '投放任务',
            dataIndex: 'launchName',
            key: 'launchName',
            render: (text, record) => (
                <span className="name">{record.launchName}</span>
            )
        }, {
            title: '分配群',
            dataIndex: 'groupNum',
            key: 'groupNum',
            render: (text, record) => (
                <span>{record.groupNum}</span>
            )
        },{
            title: '预占群',
            dataIndex: 'proGroupNum',
            key: 'proGroupNum',
            render: (text, record) => (
                <span>{record.proGroupNum}</span>
            )
        }, {
            title: '已投放',
            dataIndex: 'successNum',
            key: 'successNum',
            render: (text, record) => (
                <span>{record.successNum}</span>
            )
        }, {
            title: '投放日期',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            render: (text, record) => (
                <span>{record.releaseDate.replace('T',' ')}</span>
            )
        }]
        return (
            <div className="task-table">
                <Table rowKey={record => record.id} columns={columns} dataSource={data} pagination={false}/>
            </div>
        )
    }
}