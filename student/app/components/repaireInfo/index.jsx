import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, message, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { webApi } from '../../utils';
import LineEcharts from './components/lineEcharts';

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        webApi.get('/getRepaireStatus?type=repair').then(data => {
            if (data.flag) {
                this.setState({ data: data.returnValue })
            } else {
                message.error('获取数据失败')
            }
        })
    }

    render() {
        const option = {
            backgroundColor: {
                repeat: 'repeat'
            },
            title: {
                text: '维修信息',
                textStyle: {
                    color: '#235894'
                },
                left: 'center'
            },
            tooltip: {},
            series: [{
                name: '维修信息状态',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 30,
                clockwise: true,
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 18,
                            color: '#235894'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#235894'
                        }
                    }
                },
                data: this.state.data,
            }]
        }
        return (
            <div>
                <Row gutter={16}>
                    <Col md={24}>
                        <div>
                            <Card>
                                <LineEcharts />
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <ReactEcharts
                                    option={option}
                                    style={{ height: 300, width: '100%' }}
                                    className={'react_for_echarts'}
                                />
                                <div style={{ textAlign: 'center', }}>
                                    <Link to={{ pathname: '/backstage/repaire/list', state: '未解决' }} style={{ fontSize: 16 }}>查看未解决列表<Icon type="caret-right" /></Link>
                                    <Link to={{ pathname: '/backstage/repaire/list', state: '已解决' }} style={{ fontSize: 16, marginLeft: 10 }}>查看已解决列表<Icon type="caret-right" /></Link>
                                </div>
                            </Card>
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}