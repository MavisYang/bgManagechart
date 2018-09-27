import React,{Component} from 'react'
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css'; 
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./rangePicker.css"


export default class RangePicker extends Component {
    constructor(props){
        super(props)

    }
    onChange = (date, dateString) => {
        // console.log(date, dateString,1);
        if(this.props.setDateParams){
            this.props.setDateParams(dateString)
        }
    }
    onOpenChange = (status) => {
        // console.log(status,2) //true or false
    }


    render(){
        const {dateValue,disabledDate} =this.props;
        return (
            <DatePicker.RangePicker
                defaultValue={dateValue}
                showTime={false}
                locale={locale}
                className={"dateSelect"}
                dropdownClassName={"dateRangePicker"}
                onOpenChange={this.onOpenChange}
                onChange={this.onChange}
                disabledDate={disabledDate}
            />
           
        )
    }
}