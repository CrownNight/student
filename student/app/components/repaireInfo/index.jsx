import React from 'react';
import {Input,Form,Row,Col,Card,Button,message,Table} from 'antd';
import EditRepaire from './components/editRepaire';
import AddRepaire from './components/addRepaire';

const FormItem = Form.Item;


const columns=[
    {title:'报修人',dataIndex:'n1',render:(text)=>'123'},
    {title:'报修时间',dataIndex:'n2',render:(text)=>'2018.3.6'},
    {title:'报修宿舍',dataIndex:'n3',render:(text)=>'10230'},
    {title:'详细报修描述',dataIndex:'n4',render:(text)=>'4456465132'},
    {title:'报修状态',dataIndex:'n5',render:(text)=>'已解决'},
    {title:'解决时间',dataIndex:'n6',render:(text)=>'2018.3.9'},
    {title:'操作',dataIndex:'n6',render:(text)=><EditRepaire/>}
]

const data=[
    {key:1},{key:2},{key:3},{key:4},{key:5},
]

export default class Repir extends React.Component{
    constructor() {
        super();
        this.state={}
    }

    render() {
        return(
            <div>
              <div style={{marginLeft:10}}><h1>维修信息</h1></div> 
              <div style={{position:'relative',bottom:5,left:'95%'}}><AddRepaire/></div>
                 <Card>
                     <Table
                     dataSource={data}
                     columns={columns}
                     />
                     </Card>                   
            </div>
        )
    }
}