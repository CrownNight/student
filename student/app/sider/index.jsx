import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

const {Sider} = Layout;

export default class SystemSider extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
                <Sider style={{height:600}}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user"/>
                        <span>
                            <Link to='/basicInfo' style={{color: '#fff'}}>基本信息管理</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera"/>
                        <span>
                            <Link to='/houseInfo' style={{color: '#fff'}}>宿舍信息管理</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload"/>
                        <span>
                            <Link to='visreg' style={{color: '#fff'}}>来访登记</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user"/>
                        <span>
                            <Link to='property' style={{color: '#fff'}}>财产登记</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="user"/>
                        <span>
                            <Link to='addRepir' style={{color: '#fff'}}>添加报修</Link>
                        </span>
                    </Menu.Item>
                </Menu>
            </Sider>

        )
    }
}