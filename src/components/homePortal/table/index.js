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
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span className="name">{record.name}</span>
            )
        }, {
            title: '分配群',
            dataIndex: 'distGroup',
            key: 'distGroup',
            render: (text, record) => (
                <span>{record.distGroup}</span>
            )
        },{
            title: '预占群',
            dataIndex: 'preGroup',
            key: 'preGroup',
            render: (text, record) => (
                <span>{record.preGroup}</span>
            )
        }, {
            title: '已投放',
            dataIndex: 'serving',
            key: 'serving',
            render: (text, record) => (
                <span>{record.serving}</span>
            )
        }, {
            title: '投放日期',
            dataIndex: 'time',
            key: 'time',
            render: (text, record) => (
                <span>{record.time}</span>
            )
        }]
        return (
            <div className="task-table">
                <Table rowKey={record => record.id} columns={columns} dataSource={data} pagination={false}/>
            </div>
        )
    }
}