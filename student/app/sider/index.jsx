import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu

export default class SystemSider extends React.Component {
    constructor() {
        super();
    }

    render() {
        const fontStyle = {
            color: '#fff'
        }
        return (
            <Sider style={{ height: 690 }}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <SubMenu title='学生信息管理'>
                        <Menu.Item key="1">
                            <Link to='/basicInfo' style={fontStyle}>基本信息管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title='学生住宿管理'>
                        <Menu.Item key='2-0'><Link to='/studentStay'>学生外宿信息</Link></Menu.Item>
                        <Menu.Item key='2-1'><Link to='/applyStayOut'>申请外宿或退宿</Link></Menu.Item>
                        {/* <Menu.Item key='2-3'><Link to='/applyOut'>申请退宿</Link></Menu.Item> */}
                    </SubMenu>
                    <SubMenu title='宿舍信息管理'>
                        <Menu.Item key="3-0">
                            <Link to='/houseInfo' style={fontStyle}>房间信息管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title='日常操作管理'>
                        <Menu.Item key="4">
                            <Link to='visreg' style={fontStyle}>访客信息登记</Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to='repaire' style={fontStyle}>维修信息登记</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to='borrow' style={fontStyle}>物品借用登记</Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to='discipline' style={fontStyle}>学生违纪登记</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu title='系统设置'>
                        {/* <Menu.Item key="10">
                            <Link to='/addAdmin' style={fontStyle}>添加管理员</Link>
                        </Menu.Item> */}
                        <Menu.Item key="11">
                            <Link to='/resetPas' style={fontStyle}>修改密码</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

        )
    }
}