import React from 'react';
import { Layout } from 'antd';
import SystemHeader from './headers'
import SystemSider from './sider';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./routes/index";
import createHistory from 'history/createBrowserHistory';
import './index.css'

const history = createHistory();

const { Content } = Layout;

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router history={history}>
                <Layout>
                    <SystemHeader />
                    <Layout>
                        <div className='sider'>
                            <SystemSider />
                        </div>

                        <div className='content'>
                            <Content>
                                <Routes />
                            </Content>
                        </div>


                    </Layout>
                </Layout>
            </Router>
        )
    }
}