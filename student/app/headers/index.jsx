import React from 'react';
import {Layout,Row, Col} from 'antd';

const {Header} =Layout;
export default class SystemHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Header style={{background:'#e9e9e9'}}>
                <Row>
                    <Col span={21}  style={{textAlign:'center'}}>
                        <h1>CrowNight宿舍管理</h1></Col>
                    <Col span={3} style={{textAlign:'center'}}>
                        <span>登录</span>&nbsp;/&nbsp;
                        <span>注册</span>
                    </Col>
                </Row>
            </Header>
        )
    }
}