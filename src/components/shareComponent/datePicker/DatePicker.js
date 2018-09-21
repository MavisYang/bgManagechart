import React,{Component} from 'react'
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./datePicker.scss"
import {getLastMonthYestdy} from '../../../funStore/func'

export default class DatePickeSelect extends Component {
    constructor(props){
        super(props)

    }
    onChange = (date, dateString) => {
        console.log(date, dateString,1);
        // if(this.props.setDateParams){
        //     this.props.setDateParams(dateString)
        // }
    }
    onOpenChange = (status) => {
        // console.log(status,2) //true or false
    }

    disabledDate=(current)=>{
        return  current < getLastMonthYestdy(new Date()) && current > moment().endOf(current)
    }

    render(){
        const {dateValue,disabledDate} =this.props;
        return (
            <DatePicker
                showTime={false}
                // showToday={false}
                locale={locale}
                className={"datePickerSelect"}
                dropdownClassName={"datePicker"}
                onOpenChange={this.onOpenChange}
                onChange={this.onChange}
                disabledDate={this.disabledDate}
            />

        )
    }
}