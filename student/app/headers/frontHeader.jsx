import React from 'react';
import { Layout } from 'antd';
import { Router,Route } from 'react-router-dom'
import FrontIndex from '../sider/frontIndex';
import FrontRoutes from '../routes/frontRoutes';
import createHistory from 'history/createBrowserHistory';
import Login from '../login/login'
const history = createHistory();

const { Content, Footer } = Layout
export default class Front extends React.Component {
    constructor() {
        super()
    }
    componentDidMount(){
        history.push('/front/news')
    }

    render() {
        return (
            <Layout>
                <Router history={history}>
                    <div>
                        <FrontIndex history={this.props.history}/>
                        <Content style={{ marginTop: 65 }}>
                            <FrontRoutes />
                        </Content>
                    </div>
                </Router>
                {/* <Footer style={{ textAlign: 'center',position:'relative',bottom:0 ,width:'100%'}}>宿舍管理系统@2018 Created By 信息科学与工程学院，2014级通信3班魏洪福</Footer> */}
            </Layout>
        )
    }
}