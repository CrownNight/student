import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Card, Row, Col, message,Icon } from 'antd';
import { Link } from 'react-router-dom';
import { webApi } from '../../utils';

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        webApi.get('/getEmptyHouse').then(data=>{
            if(data.flag){
                this.setState({data:data.returnValue})
            }else{
                message.error('获取宿舍信息失败')
            }
        })
    }

    render() {
        const option = {
            title: {
                text: '宿舍空余情况',
                textStyle: {
                    color: '#235894'
                }
            },
            tooltip:{},
            series:[{
                name:'宿舍空余',
                type:'pie',
                data:this.state.data
            }]
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
                                <Link to={{ pathname: '/backstage/houseInfo/list', state: 0 }} style={{ fontSize: 16 }}><div>查看已住满列表<Icon type="caret-right" /></div></Link>
                                <Link to={{ pathname: '/backstage/houseInfo/list', state: 1 }} style={{ fontSize: 16 }}><div>查看未住满列表<Icon type="caret-right" /></div></Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}