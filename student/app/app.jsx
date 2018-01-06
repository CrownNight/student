import React from 'react';
import {Layout} from 'antd';

const {Header,Content,Sider,Footer}=Layout;

export default class App extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Layout>
                <Sider>456</Sider>
                <Layout>
                    <Header style={{color:'#fff'}}>123</Header>
                    <Content>789</Content>
                    <Footer>1123</Footer>
                </Layout>
            </Layout>
        )
    }
}