import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import avater from '../../image/6.jpg'
import '../index.css'


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class FrontIndex extends React.Component {
    constructor() {
        super()
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

    logOut(){
        localStorage.removeItem('temp');
        this.props.history.push('/login')
    }

    render() {
        return (
            <Menu
                mode="horizontal"
                theme='dark'
                style={{ position: 'fixed', width: '100%', zIndex: 1000, top: 0, height: 60, }}
            >
                <div style={{ height: 20, width: 20, float: 'left' }}>
                    <img src={require('../../image/5.jpg')} width='230' height='59' />
                </div>
                <Menu.Item key="1" style={{ marginTop: 5, marginLeft: 250 }}>
                    <Link to='/front/news' />新闻与公告
                </Menu.Item>
                <SubMenu title={<span>外宿退宿申请</span>} style={{ marginTop: 5 }}>
                    <MenuItemGroup >
                        <Menu.Item key="setting:1"><Link to='/front/applystayout' />外宿申请</Menu.Item>
                        <Menu.Item key="setting:2"><Link to='/front/applytuisu' />退宿申请</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <SubMenu title={<span>信息登记</span>} style={{ marginTop: 5 }}>
                    <MenuItemGroup >
                        <Menu.Item key="register:1"><Link to='/front/registervis' />访客信息登记</Menu.Item>
                        <Menu.Item key="register:2"><Link to='/front/registerrepaire' />维修信息登记</Menu.Item>
                        <Menu.Item key="register:3"><Link to='/front/registerborrow' />物品借用登记</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="person" style={{ marginTop: 5 }}>
                    <Link to='/front/personinfo' />个人信息
                </Menu.Item>          
                <SubMenu  title={<span className="avatar"><img src={avater} alt="头像" className='img' /><i className="on bottom b-white" /></span>} style={{marginTop:5,marginLeft:700}}>
                    <MenuItemGroup title="用户中心">
                        <Menu.Item key="setting:4">你好 - {this.state.username}</Menu.Item>     
                        <Menu.Item key="setting:5"><Link to='/front/resetpassword'/>修改密码</Menu.Item>                
                        <Menu.Item key="logout"><span onClick={this.logOut.bind(this)}>退出登录</span></Menu.Item>
                    </MenuItemGroup>
                    {/* <MenuItemGroup title="设置中心">
                        <Menu.Item key="setting:6">个人设置</Menu.Item>
                        <Menu.Item key="setting:7">系统设置</Menu.Item>
                    </MenuItemGroup> */}
                </SubMenu>           
                {this.state.isAdmin == '是' ? <Link to='/backstage/app' style={{ position: 'fixed', top: 5, right: 25, color: '#eee', fontSize: 28 }}><Icon type="retweet" /></Link> : ''}
            </Menu>
        );
    }
}