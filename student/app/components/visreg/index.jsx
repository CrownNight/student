import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, message,Icon } from 'antd';
import { Link } from 'react-router-dom';
import { webApi } from '../../utils';

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            date: []
        }
    }

    componentDidMount() {
        let newArr = []
        webApi.get('/getDateForVister?type=regis').then(data => {
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
        webApi.post('/getCountForVister?type=regis', ar).then(item => {
            if (item.flag) {
                this.setState({ data: item.returnValue })
            }
        })
    }

    render() {
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
                type: 'category',
                data: this.state.date
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
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