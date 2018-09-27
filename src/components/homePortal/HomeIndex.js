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

let startDay = moment().subtract(6, 'days')
// new Date(new Date()- 6*24*60*60*1000)
let endDay= new Date()
export default class HomeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            parmars:{
                startDay:moment(startDay).format('YYYY-MM-DD'),
                endDay:moment(endDay).format('YYYY-MM-DD')
            },
            dateArr: [startDay,endDay],
            oneDate:endDay,
            url: "/launch-api/schedule/schedulelistdetail",//获取列表数据接口,
            tableLists: {
                resultContent: [],
                pageInfo: {
                    pageSize: 10,
                    currentPage: 0,
                    totalPage: 1
                },
            },
            coluData:{
                xAxis:[],
                yAxis:[]
            },
            foldData:{
                xAxis:[],
                yAxis:{
                    pro_num:[],
                    totalGroupNum:[],
                    group_num:[],
                    success_num:[]
                }
            }
        }
    }

    componentDidMount() {
        //获取排期图
        this.getEchartsData()
        //获取列表
        this.getTableDate()

    }
    getEchartsData=()=>{
        const {parmars,coluData,foldData} =this.state
        console.log(parmars,'parmars')
        AxiosCore.post('/launch-api/schedule/schedulemonth',parmars).then(res=>{
            if(res.resultCode==100){
                let colu = res.resultContent.colu
                let fold = res.resultContent.fold
                //柱状图
                coluData.xAxis = colu.map(v=>Object.keys(v)[0])
                coluData.yAxis = colu.map(v=>Object.values(v)[0])
                //折线图
                foldData.xAxis = fold.map(v=>Object.keys(v)[0])
                let yValues = fold.map(v=>Object.values(v)[0])
                yValues.map(v=>{
                    foldData.yAxis.pro_num.push(v.pro_num)
                    foldData.yAxis.totalGroupNum.push(v.totalGroupNum)
                    foldData.yAxis.group_num.push(v.group_num)
                    foldData.yAxis.success_num.push(v.success_num)
                })
                this.setState({
                    coluData,foldData
                })
            }
            this.setState({
                loading:false
            })
        })
    }
    getTableDate=()=>{
        const {tableLists,oneDate} =this.state
        let url = this.state.url +'?_currentPage='+tableLists.pageInfo.currentPage +'&_pageSize='+tableLists.pageInfo.pageSize+'&releaseDay='+moment(oneDate).format('YYYY-MM-DD')
        AxiosCore.get(url).then(res=>{
            // console.log(res,'res')
            if(res.resultCode==100){
                this.setState({
                    tableLists:res
                })
            }
            this.setState({
                listLoad:false
            })

        })

    }

    changeTableLists = (res) => {
        this.setState({
            tableLists: res
        })
    }
    setDateParams = (dateString) => {
        if(typeof dateString==='object'){  //获取排期图
            const { parmars} =this.state
            parmars.startDay =dateString[0]
            parmars.endDay =dateString[1]
            this.setState({
                loading:true,
                dateArr: dateString[0] !== '' ? dateString : '',
                parmars
            },dateString[0] !== ''?this.getEchartsData:null)
        }else{ //string 选一天
            this.setState({
                // listLoad:true,
                oneDate: dateString!==''?dateString:[],
            },dateString!==''?this.getTableDate:null)
        }
    }


    render() {
        const {loading,tableLists,dateArr,oneDate} =this.state
        return (
            <div className='homeContent'>
                <div className="title">
                    <div className='left'>
                        排期表
                    </div>
                    <div className="right">
                        <span>选择日期：</span>
                        <RangePicker
                            dateValue={[moment(dateArr[0]), moment(dateArr[1])]}
                            disabledDate={(current) => {
                                return current > moment().endOf(current)
                            }}
                            setDateParams={this.setDateParams}
                        />
                    </div>
                </div>
                <div className='echarts-line' style={{height:'400px'}}>
                    {!loading?<Line foldData={this.state.foldData}/>: <div className='loading'>数据加载中...</div>}
                </div>
                <div className='echarts-line' style={{ height: "354px" }}>
                    {!loading?<Bar coluData={this.state.coluData}/>: <div className='loading'>数据加载中...</div>}
                </div>
                <div className="title">
                    <div className='left'>
                        投放任务
                    </div>
                    <div className="right">
                        <span>选择日期：</span>
                        <DatePicker
                            dateValue={moment(oneDate)}
                            disabledDate={(current) => {
                                return current < moment().subtract(30, 'days') || current > moment().endOf(current)
                            }}
                            setDateParams={this.setDateParams}
                        />
                    </div>
                </div>
                <div className='tableContent'>
                    <TableList data={tableLists.resultContent}/>
                    {
                        tableLists.pageInfo&&tableLists.pageInfo.totalPage>1
                            ? <PageFragRule
                                pageInfo={tableLists.pageInfo}
                                releaseDay={oneDate}
                                pullData={this.changeTableLists}
                                url={this.state.url}
                            />:null
                    }
                </div>


            </div>
        )
    }
}