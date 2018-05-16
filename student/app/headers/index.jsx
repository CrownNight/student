import React from 'react';
import { Layout, Row, Col, Menu ,Icon} from 'antd';
import avater from '../../image/6.jpg'
import {Link} from 'react-router-dom'
import '../index.css'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class SystemHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            isAdmin: ''
        }
    }
    componentDidMount() {
        const item = localStorage.getItem('temp');
        let data = JSON.parse(item);
        this.setState({
            username: data.username,
            isAdmin: data.isAdmin
        })
    }
    logOut() {
        localStorage.removeItem('temp');
        this.props.history.push('/login')
    }
    render() {
        return (
            <Menu  mode="horizontal"
            theme='dark'
            style={{ position: 'fixed', width: '100%', zIndex: 1000, top: 0, height: 78, zIndex:10000}}>
                <div style={{ height: 20, width: 20, float: 'left' }}>
                    <img src={require('../../image/5.jpg')} width='200' height='78' />
                </div>
                <Menu.Item  style={{marginLeft:600,marginTop:10}}>
                    <div> <h1 style={{ color: '#fff' }}>宿舍管理系统</h1></div>                 
                </Menu.Item>
                {/* <SubMenu title={<span className="avatar"><img src={avater} alt="头像" className='img' /></span>} style={{marginLeft:670,marginTop:13 }}>
                    <MenuItemGroup title="用户中心">
                        <Menu.Item key="setting:4">你好 - {this.state.username}</Menu.Item>
                        <Menu.Item key="logout"><span onClick={this.logOut.bind(this)}><Link to='/login'/>退出登录</span></Menu.Item>
                    </MenuItemGroup>
                </SubMenu> */}
                <Link to='/front/news' style={{ position: 'fixed', top: 13, right: 25, color: '#eee', fontSize: 28 }}><Icon type="retweet" /></Link> 
            </Menu>
        )
    }
}