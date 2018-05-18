import React from 'react';
import { Card, Row, Col, Icon,Radio } from 'antd';
import { Link } from 'react-router-dom';
import PieEcharts from './components/pieEcharts';
import LineEcharts from './components/lineEcharts'

const RadioGroup=Radio.Group;
const RadioButton = Radio.Button;

export default class Index extends React.Component {
    constructor() {
        super();
        this.state={
            type:'day'
        }
    }

    handleChange(e){
        this.setState({type:e.target.value});
    }
    render() {
        return (
            <div style={{height:750}}>
                <Row gutter={16}>
                    <Col md={24}>
                        <Card>
                            <RadioGroup defaultValue='day' size='large' onChange={this.handleChange.bind(this)} value={this.state.type}>
                                <RadioButton value='day'>按天</RadioButton>
                                <RadioButton value='month'>按月</RadioButton>
                                <RadioButton value='year'>按年</RadioButton>
                            </RadioGroup>
                            <div><LineEcharts type={this.state.type} /></div>
                            <div><PieEcharts /></div>
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