import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { webApi } from '../../../utils';
import { message } from 'antd';

export default class LineEcharts extends React.Component {
    constructor() {
        super();
        this.state = {
            date: [],
            data: [],
        }
    }
    componentWillReceiveProps(nextProps,nextState){
        this.getList(nextProps.type)
    }
    componentDidMount() {
     this.getList(this.props.type)
    }
    getList(type){
        let newArr = [];
        webApi.get('/getDateOfDisc?type=disc&datetype='+type).then(data => {
            if (data.flag) {
                let arr = data.returnValue;
                for (let i = 0; i < arr.length; i++) {
                    if (newArr.indexOf(arr[i]) == -1) {
                        newArr.push(arr[i])
                    }
                };
                newArr.sort();
                this.setState({ date: newArr });
                webApi.post('/getCountOfDisc?type=disc&datetype='+type, newArr).then(item => {
                    if (item.flag) {
                        this.setState({ data: item.returnValue })
                    }
                })
            }
        })
    }

    render() {
        const option={
            title:{
                text:'违纪曲线',
                textStyle:{
                    color:'#235894'
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
            series:[{
                type:'line',
                name:'人数',
                data:this.state.data
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