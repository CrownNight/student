import React from 'react';
import { Row, Card, Col, Table, message, Pagination } from 'antd';
import AddUser from './addUser';
import UserEdit from './userEdit';
import { webApi,XTable } from '../../utils';

export default class BasicInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            index: 1,
            size: 8,
            total: 0
        }
    }

    componentDidMount() {
        const { index, size } = this.state;
        this.getUserList(index, size);
    }
    getUserList(index, size) {
        webApi.get('/getUserList?index=' + index + '&size=' + size+'&type=否').then(data => {
            if (data.flag) {
                this.setState({ data: data.returnValue,total:data.total })
            } else {
                message.error(data.errorMessage)
            }
        })
    }

    callBack(status) {
        const { index, size } = this.state;
        if (status) {
            this.getUserList(index, size);
        }
    }

    handleChange(index, size) {
        this.setState({ index: index, size: size });
        this.getUserList(index, size);
    }
    render() {
        const { data, index, size, total } = this.state;
        const columns = [
            // { title: '编码', dataIndex: 'userId', },
            { title: '姓名', dataIndex: 'userName' },
            { title: '电话', dataIndex: 'phone' },
            { title: '学号', dataIndex: 'number' },
            { title: '性别', dataIndex: 'sex', },
            { title: '学院', dataIndex: 'profession', },
            { title: '专业', dataIndex: 'college', },
            { title: '班级', dataIndex: 'grade', },
            { title: '宿舍', dataIndex: 'house' },
            { title: '操作', width: 150, dataIndex: 'v8', render: (text, record, index) => <UserEdit data={record} callBack={this.callBack.bind(this)} /> }
        ]
        return (
            <div style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <Card hoverable='noHovering' title={<h1>学生信息</h1>} style={{ height: 800 }}>
                    <div style={{ position: 'relative', bottom: 5, left: '95%' }}><AddUser callBack={this.callBack.bind(this)} /></div>
                    <Row>
                        <Col>
                           <XTable data={data} columns={columns} index={index} size={size} total={total} onChange={this.handleChange.bind(this)}/>                          
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}