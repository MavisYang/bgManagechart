import React,{Component} from 'react';
import './index.css'
import moment from 'moment';
import RangePicker from '../shareComponent/rangePicker/RangePicker'
import DatePicker from '../shareComponent/datePicker/DatePicker'
import Bar from './Bar'
import Line from './Line'
import TableList from './table'
const data=[
    {
        name:'为什么国内 IT 公司 leader 以上就不怎么写代码，而据说 Google…',
        distGroup:99,
        preGroup:4566,
        serving:5656,
        time:'2018-07-26',
        id:1
    }
]
export default class HomeIndex extends Component{
    constructor(props){
        super(props);
        this.state={
            dateArr:[]
        }
    }
    componentDidMount(){
    }

    setDateParams = (dateString) => {
        console.log(dateString);
        this.setState({
            dateArr: dateString[0] != '' ? dateString : ''
        })
    }


    render(){
        return (
        <div className='homeContent'>
            {/*<div className="title">*/}
                {/*<div className='left'>*/}
                    {/*排期表*/}
                {/*</div>*/}
                {/*<div className="right">*/}
                    {/*<span>选择日期：</span>*/}
                    {/*<RangePicker*/}
                        {/*dateValue={this.state.dateArr}*/}
                        {/*disabledDate={(current)=>{return  current > moment().endOf(current) }}*/}
                        {/*setDateParams={this.setDateParams}*/}
                    {/*/>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*<Line/>*/}
            {/*<Bar/>*/}
            <div className="title">
                <div className='left'>
                    投放任务
                </div>
                <div className="right">
                    <span>选择日期：</span>
                    <DatePicker disabledDate={(current)=>{return  current > moment().endOf(current) }}/>
                </div>
            </div>
            <div className='tableContent'>
                <TableList data={data}/>
            </div>
        </div>
        )
    }
}