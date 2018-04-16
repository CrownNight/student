import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Link } from 'react-router-dom';
import { webApi } from '../../../utils';
import { message } from 'antd';

export default class LineEcharts extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            date: []
        }
    }

    componentDidMount() {
        webApi.get('/getDateForRepaire?type=repair').then(data => {
            if (data.flag) {
                let newArr = data.returnValue;
                let arr = []
                for (var i = 0; i < newArr.length; i++) {
                    if (arr.indexOf(newArr[i]) == -1) {
                        arr.push(newArr[i])
                    }
                }              
                arr.sort();
                this.setState({ date: arr });
              this.getData(arr)
            } else {
                message.error('获取日期列表失败')
            }
        })
    }

    getData(ar){
        webApi.post('/getCountForRepaire?type=repair', ar).then(item => {
            if (item.flag) {
                this.setState({ data: item.returnValue })
            } else {
                message.error('获取报修信息失败')
            }
        })
    }
    
    render() {
        const option = {
            title: {
                text: '报修走势曲线',
                textStyle: {
                    color: '#235894'
                },
                left:'center'
            },
            tooltip: {trigger: 'axis'},
            xAxis: {
                type: 'category',
                data: this.state.date
            },
            yAxis: {
                type: 'value'
            },
            // dataZoom: [{
            //     type: 'inside',
            //     start: 0,
            //     end: 10
            // }, {
            //     start: 0,
            //     end: 10,
            //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //     handleSize: '80%',
            //     handleStyle: {
            //         color: '#fff',
            //         shadowBlur: 3,
            //         shadowColor: 'rgba(0, 0, 0, 0.6)',
            //         shadowOffsetX: 2,
            //         shadowOffsetY: 2
            //     }
            // }],
            series: [{
                name: '报修日期和数量',
                type: 'line',
                data: this.state.data
            }]
        }
        return (
            <ReactEcharts
                option={option}
                style={{ height: 300, width: '100%' }}
                className={'react_for_echarts'}
            />
        )
    }
}