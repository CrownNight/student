import React from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { Row, Col, Card, message, Icon } from 'antd';
import { Link } from 'react-router-dom'
import { webApi } from '../../utils'



export default class XEcharts extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        let arr = [];
        let college = ['信息科学与工程', '土木工程', '生物产业', '外国语', '电子信息工程', '自动化', '政治', '艺术', '医护', '体育']
        webApi.post('/getDataForStudent', college).then(data => {
            if (data.flag) {
                data.returnValue.map(key => {
                    arr.push({ value: key.count, name: key.college })
                })
                this.setState({ data: arr })
            } else {
                message.error(data.returnValue)
            }
        })
    }

    render() {
        const option = {
            backgroundColor: {
                repeat: 'repeat'
            },
            title: {
                text: '各学院的人数',
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
        };
        return (
            <Row gutter={16}>
                <Col md={24}>
                    <div>
                        <Card bordered={false}>
                            <ReactEcharts
                                option={option}
                                style={{ height: '500px', width: '800px' }}
                                className={'react_for_echarts'}
                            />
                        </Card>
                        <div style={{ textAlign: 'center', height: 500 }}>
                            <Link to='/backstage/basicinfo/list' style={{fontSize:16}}>查看学生详细列表<Icon type="caret-right" /></Link>
                        </div>
                    </div>
                </Col>

            </Row>
        )
    }
}