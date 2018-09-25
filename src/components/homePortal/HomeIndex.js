import React, {Component} from 'react';
import './index.css'
import moment from 'moment';
import RangePicker from '../shareComponent/rangePicker/RangePicker'
import DatePicker from '../shareComponent/datePicker/DatePicker'
import PageFragRule from '../shareComponent/pageRule/PageRules'
import Bar from './Bar'
import Line from './Line'
import TableList from './table'
import AxiosCore from '../../funStore/AxiosCore'

export default class HomeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateArr: [],
            date:'',
            url: "/launch-api/accounts/dayslip",//获取列表数据接口,
            tableLists: {
                resultContent: [
                    {
                        name: '为什么国内 IT 公司 leader 以上就不怎么写代码，而据说 Google…',
                        distGroup: 99,
                        preGroup: 4566,
                        serving: 5656,
                        time: '2018-07-26',
                        id: 1
                    }
                ],
                pageInfo: {
                    pageSize: 10,
                    currentPage: 0,
                    totalPage: 1
                },
            },
        }
    }

    componentDidMount() {
    }

    setDateParams = (dateString) => {
        console.log(dateString);
        if(typeof dateString=='object'){
            this.setState({
                dateArr: dateString[0] != '' ? dateString : ''
            },this.getEchartsData)
        }else{ //string
            this.setState({
                date: dateString
            },this.getTableDate)
        }
    }

    getEchartsData=()=>{
        let dateArr=this.state.dateArr

    }

    getTableDate=()=>{
        let date=this.state.date

    }

    setPageRulesParams = (e) => {
        let searchParamas = {};
        if (e[0] && e[1]) {
            searchParamas.endDate = e[1];
            searchParamas.startDate = e[0]
        }
        this.setState({
            searchParamas: searchParamas
        }, () => {
            this.getTableList()
        })
    }

    getTableList = () => {
        let url = this.state.url + '?_currentPage=0&_pageSize=10';
        AxiosCore.post(url, this.state.date).then(res => {
            if (res.resultCode === "100") {

            }
        }).catch(req => {
            console.log(req)
        })
    }

    changeTableLists = (res) => {
        console.log(res)
        this.setState({
            tableLists: res
        })
    }

    render() {
        const {tableLists} =this.state
        return (
            <div className='homeContent'>
                <div className="title">
                    <div className='left'>
                        排期表
                    </div>
                    <div className="right">
                        <span>选择日期：</span>
                        <RangePicker
                            dateValue={this.state.dateArr}
                            disabledDate={(current) => {
                                return current > moment().endOf(current)
                            }}
                            setDateParams={this.setDateParams}
                        />
                    </div>
                </div>
                <Line/>
                <Bar/>
                <div className="title">
                    <div className='left'>
                        投放任务
                    </div>
                    <div className="right">
                        <span>选择日期：</span>
                        <DatePicker
                            disabledDate={(current) => {
                                return current < moment().subtract(30, 'days') || current > moment().endOf(current)
                            }}
                            setDateParams={this.setDateParams}
                        />
                    </div>
                </div>
                <div className='tableContent'>
                    <TableList data={tableLists.resultContent}/>
                </div>
                {
                    tableLists.pageInfo&&tableLists.pageInfo.currentPage>1
                        ? <PageFragRule
                            pageInfo={tableLists.pageInfo}
                            searchParamas={this.setPageRulesParams}
                            pullData={this.changeTableLists}
                            url={this.state.url}
                        />:null
                }

            </div>
        )
    }
}