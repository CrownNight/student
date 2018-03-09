import React from 'react';
import {Layout} from 'antd';
import SystemHeader from './headers'
import SystemSider from './sider';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes/index";
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const {Content}=Layout;

export default class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Router history={history}>
                <Layout>
                    <SystemHeader/>
                    <Layout>
                        <SystemSider/>
                        <Content>
                           <Routes/>
                        </Content>

                    </Layout>
                </Layout>
            </Router>
        )
    }
}