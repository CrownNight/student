import React from 'react';
import { Row,Card, Col,Table} from 'antd';
import AddUser from './addUser';
import UserEdit from './userEdit';

const colums=[
    {title:'编码',dataIndex:'v1',key:'v1',render:(text)=>'123456'},
    {title:'姓名',dataIndex:'v2',key:'v2',render:(text)=><UserEdit/>},
    {title:'电话',dataIndex:'v3',key:'v3',render:(text)=>'123456'},
    {title:'学号',dataIndex:'v4',key:'v4',render:(text)=>'12345456'},
    {title:'性别',dataIndex:'v5',key:'v5',render:(text)=>'男'},
    {title:'院系',dataIndex:'v6',key:'v6',render:(text)=>'信息科学与技术'},
    {title:'操作',width:150,dataIndex:'v7',key:'v7',render:(text,record,index)=><AddUser/>}
]

const data=[
    {key:1},{key:2},{key:3},{key:4},{key:5},{key:6}
]

export default class BasicInfo extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
           <div>
               <div><h2></h2></div>
               <Card noHovering title={<h1>学生信息</h1>}>
                   <Row>
                       <Col>
                           <div style={{marginLeft:30}}>
                               <Table
                                   dataSource={data}
                                   columns={colums}
                               size='large'/>
                           </div>
                       </Col>
                   </Row>
               </Card>
           </div>
        )
    }
}