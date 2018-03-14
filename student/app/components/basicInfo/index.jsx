import React from 'react';
import { Row, Card, Col, Table ,message} from 'antd';
import AddUser from './addUser';
import UserEdit from './userEdit';
import { webApi } from '../../utils';

const colums = [
    { title: '编码', dataIndex: 'userId', },
    { title: '姓名', dataIndex: 'userName', render: (text, record) => <UserEdit data={record} /> },
    { title: '电话', dataIndex: 'phone' },
    { title: '学号', dataIndex: 'number' },
    { title: '性别', dataIndex: 'sex', },
    { title: '院系', dataIndex: 'class', },
    { title: '宿舍', dataIndex: 'house' },
    { title: '操作', width: 150, dataIndex: 'v8', render: (text, record, index) => <AddUser data={record} /> }
]

export default class BasicInfo extends React.Component {
    constructor() {
        super();
        this.state = { data: [] }
    }

    componentDidMount() {
        webApi.get('/getUserList').then(data => {
           if(data.flag){
               this.setState({data:data.returnValue})
           }else{
               message.error(data.errorMessage)
           }
        })
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <Card hoverable='noHovering' title={<h3>学生信息</h3>}>
                    <Row>
                        <Col>
                            <Table
                                dataSource={data}
                                columns={colums}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}