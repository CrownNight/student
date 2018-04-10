import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, message, Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { webApi } from '../../utils';

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        let item = []
        let text = ''
        webApi.get('/getCountForStatus').then(data => {
            if (data.flag) {
                data.returnValue.map(key => {
                    if (key.number == 1) {
                        text = '已通过'
                    } else if (key.number == 2) {
                        text = '未通过'
                    } else {
                        text = '待审核'
                    }
                    item.push({ value: key.value, name: text })
                })
                this.setState({
                    data: item
                })
            } else {
                message.error('获取信息失败')
            }
        })
    }

    render() {
        const options = {
            title: {
                text: '退宿或外宿信息',
                textStyle: {
                    color: '#235894'
                }
            },
            tooltip: {},
            series: [{
                name: '人数',
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
                        <Card>
                            <ReactEcharts
                                option={options}
                                style={{ height: '500px', width: '800px' }}
                                className={'react_for_echarts'}
                            />
                            <div style={{ textAlign: 'center', height: 500 }}>
                                <Link to={{ pathname: '/backstage/studentStay/list', state: 3 }} style={{ fontSize: 16 }}><div>查看待审核列表<Icon type="caret-right" /></div></Link>
                                <Link to={{ pathname: '/backstage/studentStay/list', state: 1 }} style={{ fontSize: 16 }}><div>查看已通过列表<Icon type="caret-right" /></div></Link>
                                <Link to={{ pathname: '/backstage/studentStay/list', state: 2 }} style={{ fontSize: 16 }}><div>查看未通过列表<Icon type="caret-right" /></div></Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}