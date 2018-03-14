import React from 'react';
import { Layout, Row, Col, Menu } from 'antd';
import img from './image/timg.jpg';

const { Header } = Layout;
export default class SystemHeader extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Menu theme='dark' style={{position:'fixed',width:'100%',zIndex:1000}}>
                <Header>
                    <Row>
                        <Col span={21} style={{ textAlign: 'center' }}>
                            <h1 style={{ color: '#fff' }}>CrowNight宿舍管理</h1></Col>
                        <Col span={3} style={{ textAlign: 'center', color: '#fff' }}>
                            <span>登录</span>&nbsp;/&nbsp;
                        <span>注册</span>
                        </Col>
                    </Row>
                </Header>
            </Menu>
        )
    }
}