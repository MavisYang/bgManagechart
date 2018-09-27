import React,{Component} from 'react';
import './index.css'
import moment from 'moment';
import echarts from 'echarts'
// const lineXData = ['2018-08-26','2018-08-27','2018-08-28','2018-08-29','2018-08-30','2018-08-31','2018-09-01']
export default class Bar extends Component{

    componentDidMount(){
        let XData = this.props.coluData.xAxis
        let YData = this.props.coluData.yAxis
        this.drawCharts(XData,YData)
    }

    drawCharts = (XData,YData) => {
        let myChart = echarts.init(document.getElementById('bar'));
        var option = {
            backgroundColor: '#fff',
            textStyle: {
                fontFamily: 'PingFangSC',
                fontWeight: 400,
                color: '#707371',
                fontSize: 12
            },
            title: {
                text: '投放失败',
                textStyle: { color: '#485767', fontSize: 14, fontFamily: 'PingFangSC', fontWeight: 500, },
                left:'2%',
                top:'6%'
            },
            tooltip: {
                trigger: 'axis',
                extraCssText: 'box-shadow: 0 1px 4px 0 rgba(36,36,36,0.15);padding:6px 16px',
                backgroundColor: 'rgba(72,87,103,1)',
                borderColor: '#485767',
                textStyle: { fontSize: 12, fontFamily: 'PingFang SC', color: '#FFFFFF', fontWeight: 500 },
                formatter: function (params){
                    let date = params[0].name?params[0].name.split('-')[0] + '年'+params[0].name.split('-')[1] + '月' + params[0].axisValue.split('-')[2] + '日<br/>':''
                    let val = params[0].value;
                    let marker= params[0].marker + params[0].seriesName
                    let res = date + marker + '：' + val
                    return res
                },
            },
            legend: {
                data:['失败次数'],
                top:'6%',
                right:'4%'
            },
            grid: {top:'22%', left: '3%', right: '4%', bottom: '8%', containLabel: true },
            toolbox: {
                show:false
            },
            dataZoom: [{ type: 'inside', xAxisIndex: [0], filterMode: 'empty' }],
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: XData,
                offset: 8,//X 轴相对于默认位置的偏移
                /*网格*//*修改X轴线条样式*/
                splitLine: { show: false, lineStyle: { type: 'dashed', borderColor: '#707371' } },
                //轴线
                axisLine: { lineStyle: { color: '#BFC0BF' } },
                //刻度
                axisTick: {
                    lineStyle: { borderColor: '#707371' }
                },
            },
            yAxis: {
                type: 'value',
                splitLine: {show: true, lineStyle: {type: 'dashed', borderColor: '#707371'}},
                //轴线
                axisLine: {show:false},
                // 刻度
                axisTick:{show:false},
            },

            series: [
                {
                    name:'失败次数',
                    type: 'bar',
                    smooth: true,
                    barMaxWidth: '20px',
                    color: '#FF99A5',
                    data: YData,
                }
            ],

        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        //自适应
        window.addEventListener("resize", function () {
            myChart.resize();
        });

    }

    render(){
        return (<div id="bar" style={{ height: "354px" }} />)
    }
}