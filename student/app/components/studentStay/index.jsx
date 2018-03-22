import React from 'react';
import {Table,Card,Row,Col,message,Button} from 'antd';
import EditPersonalInfo from './components/editPersonalInfo';

const columns=[
    {title:'姓名', dataIndex:'n1',render:(text)=><EditPersonalInfo/>},
    {title:'院系',dataIndex:'n2',render:(text)=>'信息科学与工程'},
    {title:'宿舍及房间号',dataIndex:'n3',render:(text)=>'10-227'},
    {title:'是否外宿',dataIndex:'n4',render:(text)=>'否'},
    {title:'外宿原因',dataIndex:'n5',render:(text)=>'123456'},
    {title:'是否退宿',dataIndex:'n6',render:(text)=>'是'},
    {title:'退宿原因',dataIndex:'n7',render:(text)=>'毕业'}
]

const data=[
    {key:1},{key:2},{key:3},{key:4},{key:5},
]

export default class Accommodation extends React.Component{
    constructor() {
        super()
    }

    render() {
        return(
            <div>
                <Card title={<h1>学生住宿管理</h1>}>
                <Row>
                       <Col>
                           <div style={{marginLeft:15}}>
                               <Table
                                   dataSource={data}
                                   columns={columns}
                               />
                           </div>
                       </Col>
                   </Row>
                </Card>
            </div>
        )
    }
}