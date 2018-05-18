import React from 'react';
import { Layout } from 'antd';
import SystemHeader from './headers'
import SystemSider from './sider';
import { Router } from 'react-router-dom';
import Routes from "./routes/index";
import createHistory from 'history/createBrowserHistory';
import Login from './login/login'
import './index.css'

const history = createHistory();

const { Content, Footer } = Layout;

export default class App extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        history.push('/backstage/basicinfo')
    }

    render() {
        return (
            <Layout>
                <SystemHeader history={this.props.history} />
               
                    <Router history={history}>
                    <Layout>
                        <div style={{ width: '100%' }}>
                            <div className='sider'>
                                <SystemSider />
                            </div>
                            <div className='content'>
                                <Content>
                                    <Routes />
                                </Content>
                            </div>
                        </div>
                        </Layout>
                    </Router>
                
                <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, left: 0, zIndex: 1000, width: '100%', height: 30 }}>宿舍管理系统@2018 Created By 信息科学与工程学院，2014级通信3班魏洪福</Footer>
            </Layout>

        )
    }
}