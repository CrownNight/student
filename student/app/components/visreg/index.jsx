import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, message,Icon,Radio } from 'antd';
import { Link } from 'react-router-dom';
import { webApi } from '../../utils';

const RadioGroup=Radio.Group;
const RadioButton = Radio.Button;

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            date: [],
            dateType:'day'
        }
    }

    componentDidMount() {
      this.getList(this.state.dateType)
    }
    getList(type){
        let newArr = []
        webApi.get('/getDateForVister?type=regis&datetype='+type).then(data => {
            if (data.flag) {
                for (var i = 0; i < data.returnValue.length; i++) {
                    if (newArr.indexOf(data.returnValue[i]) == -1) {
                        newArr.push(data.returnValue[i]);
                    }
                }
                newArr.sort();
                this.setState({
                    date: newArr
                })
                this.getCount(newArr);
            }
        })
    }
    getCount(ar) {
        webApi.post('/getCountForVister?type=regis&datetype='+this.state.dateType, ar).then(item => {
            if (item.flag) {
                this.setState({ data: item.returnValue })
            }
        })
    }

    handleChange(e){
        this.setState({dateType:e.target.value})
        this.getList(e.target.value)
    }
    render() {
        const {dateType} = this.state;
        let name=''
        if(dateType=='day'){
            name='日期'
        }else if(dateType=='month'){
            name='月份'
        }else{
            name='年'
        }
        const option = {
            title: {
                left: 'center',
                text: '来访人数统计',
                textStyle: {
                    color: '#235894'
                }
            },
            tooltip: { trigger: 'axis', },
            xAxis: {
                name:name,
                type: 'category',
                data: this.state.date
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'数量',
                    data: this.state.data,
                    type: 'line',
                }
            ]
        }
        return (
            <div>
                <Row gutter={16}>
                    <Col md={24}>
                        <Card>
                            <RadioGroup defaultValue='day' size='large' onChange={this.handleChange.bind(this)} value={this.state.dateType}>
                                <RadioButton value='day'>按天</RadioButton>
                                <RadioButton value='month'>按月</RadioButton>
                                <RadioButton value='year'>按年</RadioButton>
                            </RadioGroup>
                            <ReactEcharts
                                option={option}
                                style={{ height: 500, width: '100%' }}
                                className={'react_for_echarts'}
                            />
                            <div style={{ textAlign: 'center', height: 500 }}>
                                <Link to='/backstage/visreg/list' style={{ fontSize: 16 }}>查看来访详细列表<Icon type="caret-right" /></Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}