import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, message, Icon, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { webApi } from '../../utils';
import LineEcharts from './components/lineEcharts';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            type: 'day'
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
    handleChange(e) {
        this.setState({ type: e.target.value })
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
            <div style={{ height: 700 }}>
                <Row gutter={16}>
                    <Col md={24}>
                        <div>
                            <Card>
                                <RadioGroup defaultValue='day' size='large' onChange={this.handleChange.bind(this)} value={this.state.type}>
                                    <RadioButton value='day'>按天</RadioButton>
                                    <RadioButton value='month'>按月</RadioButton>
                                    <RadioButton value='year'>按年</RadioButton>
                                </RadioGroup>
                                <LineEcharts type={this.state.type} />
                            </Card>
                        </div>                    
                      <Card>
                      <div style={{ textAlign: 'center', marginLeft:-800}}>
                            <Link to={{ pathname: '/backstage/repaire/list', state: '未解决' }} style={{ fontSize: 16 }}>查看未解决列表<Icon type="caret-right" /></Link>
                            <Link to={{ pathname: '/backstage/repaire/list', state: '已解决' }} style={{ fontSize: 16, marginLeft: 10 }}>查看已解决列表<Icon type="caret-right" /></Link>
                        </div>
                      <ReactEcharts
                            option={option}
                            style={{ height: 300, width: '100%' }}
                            className={'react_for_echarts'}
                        />
                      </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}