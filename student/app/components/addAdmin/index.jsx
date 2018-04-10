import React from 'react';
import Table, { message, Card, Row, Col } from 'antd';
import { XTable, webApi } from '../../utils';
import EditAdmin from './components/editAdmin';
import AddAdmin from './components/addAdmin'


export default class AdminList extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 1,
            size: 5,
            total: 0,
            data: []
        }
    }
    componentDidMount() {
        this.getAdminList(this.state.index, this.state.size)
    }
    getAdminList(index, size) {
        webApi.get('/getUserList?index=' + index + '&size=' + size + '&type=是').then(data => {
            debugger
            if (data.flag) {
                this.setState({ data: data.returnValue, total: data.total })
            } else {
                message.error(data.errorMessage)
            }
        })
    }
    sizeChange(index, size) {
        this.setState({ index, size })
        this.getAdminList(index, size);
    }
    callBack(sta) {
        if (sta) {
            this.getAdminList(this.state.index, this.state.size)
        }
    }
    render() {
        const { data, index, size, total } = this.state
        console.log(data)
        const columns = [
            { title: '姓名', dataIndex: 'userName' },
            { title: '性别', dataIndex: 'sex' },
            { title: '电话', dataIndex: 'phone' },
            { title: '身份证', dataIndex: 'idCard' },
            { title: '操作', dataIndex: '1', render: (text, record) => <EditAdmin data={record} callBack={this.callBack.bind(this)} /> },
        ]
        return (
            <Card hoverable='noHovering' title={<h2>管理员列表</h2>}>
                <div style={{ position: 'relative', bottom: 5, left: '95%' }}><AddAdmin callBack={this.callBack.bind(this)} /></div>
                <Row>
                    <Col>
                        <XTable data={data} columns={columns} index={index} size={size} total={total} onChange={this.sizeChange.bind(this)} />
                    </Col>
                </Row>
            </Card>
        )
    }
}