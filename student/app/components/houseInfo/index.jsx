import React from 'react';
import { Card, Col, Table, Button } from 'antd';
import AddHouse from './components/addHouse';
import EditHouse from './components/editHouse';

const columns = [
    { title: '宿舍号', dataIndex: 'n1', render: (text) => '227' },
    { title: '所属楼栋', dataIndex: 'n2', render: (text) => '10栋' },
    { title: '床位', dataIndex: 'n3', render: (text) => '6个' },
    { title: '桌椅', dataIndex: 'n4', render: (text) => '6个' },
    { title: '饮水机', dataIndex: 'n5', render: (text) => '有' },
    { title: '操作', dataIndex: 'n6', render: (text) => <EditHouse/> },
]

const data = [
    { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }, { key: 6 }, { key: 7 }, { key: 8 }
]
export default class HouseInfo extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <div style={{ marginLeft: 15, marginTop: 15, marginBottom: 15 }}><h1>宿舍信息管理</h1></div>
                <Col>
                    <Card>
                        <div style={{ position: 'relative', bottom: 10, left: '93%' }}><AddHouse /></div>
                        <Col>
                            <Table columns={columns} dataSource={data} />
                        </Col>
                    </Card>
                </Col>
            </div>
        )
    }
}