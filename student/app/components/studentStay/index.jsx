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
                        item.push(key.value)
                    }
                    if (key.value == 2) {
                        item.push(key.value)
                    }
                    if (key.number == 3) {
                        item.push(key.value)
                    }
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
                text: '退宿或外宿状态信息',
                left: 'center',
                textStyle: {
                    color: '#235894'
                }
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: [ '已通过', '未通过','待审核']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '人数',
                type: 'bar',
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
                                style={{ height: '495px', width: '800px' }}
                                className={'react_for_echarts'}
                            />
                            <div style={{ textAlign: 'center', }}>
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