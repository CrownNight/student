import React from 'react';
import { Table, Card, message } from 'antd';
import '../../index.css';
import EditInfo from './components/editInfo';
import AddBorrow from './components/addBorrow'

const columns = [
    { title: '借用人', dataIndex: 'n1', render: (text) => '123' },
    { title: '学院班级', dataIndex: 'n8', render: (text) => '123' },
    { title: '借用物品', dataIndex: 'n2', render: (text) => '123' },
    { title: '借用时间', dataIndex: 'n3', render: (text) => '2018.3.5' },
    { title: '归还时间', dataIndex: 'n4', render: (text) => '2018.3.8' },
    { title: '用途', dataIndex: 'n5', render: (text) => '152310' },
    { title: '借用状态', dataIndex: 'n6', render: (text) => '已归还' },
    { title: '操作', dataIndex: 'n7', render: (text) => <EditInfo/> },
]

const data = [
    { key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }
]

export default class Index extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <div className='pageTitle'><h1>物品借用信息</h1></div>
                <div style={{position:'relative',bottom:5,left:'95%'}}><AddBorrow/></div>
                <Card hoverable='noHovering'>
                    <Table
                        dataSource={data}
                        columns={columns}                    
                    />
                </Card>
            </div>
        )
    }
}