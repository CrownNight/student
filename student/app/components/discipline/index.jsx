import React from 'react';
import { Card, Row, Col,Icon } from 'antd';
import {Link} from 'react-router-dom';
import PieEcharts from './components/pieEcharts';
import LineEcharts from './components/lineEcharts'

export default class Index extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col md={24}>
                        <Card>                           
                            <div><LineEcharts/></div>
                            <div><PieEcharts/></div>
                            <div style={{ textAlign: 'center', }}>
                                    <Link to={{ pathname: '/backstage/discipline/list', state: '一般' }} style={{ fontSize: 16 }}>查看一般列表<Icon type="caret-right" /></Link>
                                    <Link to={{ pathname: '/backstage/discipline/list', state: '严重' }} style={{ fontSize: 16, marginLeft: 10 }}>查看严重列表<Icon type="caret-right" /></Link>
                                    <Link to={{ pathname: '/backstage/discipline/list', state: '非常严重' }} style={{ fontSize: 16, marginLeft: 10 }}>查看非常严重列表<Icon type="caret-right" /></Link>
                                </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}