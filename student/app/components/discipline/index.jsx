import React from 'react';
import { Table, Button,Popconfirm } from 'antd';
import '../../index.css';
import EditDis from './components/editDis'




const data = [
    { key: 1 }, { key: 2 }, { key: 3 }
]

export default class Discipline extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    handleConfirm() {

    }
    

    render() {
        const columns = [
            { title: '违纪人', dataIndex: 'n1', render: (text) => '123' },
            { title: '违纪时间', dataIndex: 'n2', render: (text) => '21123' },
            { title: '违纪程度', dataIndex: 'n3', render: (text) => '严重' },
            { title: '违纪描述', dataIndex: 'n4', render: (text) => '12345' },
            {
                title: '操作', width:130, dataIndex: 'n5', render: (text, record, index) => {
                    return (
                        <div>
                            <div style={{float:'left'}}><EditDis data={record} /></div>
                           <div style={{float:'right'}}>
                           <Popconfirm onConfirm={this.handleConfirm.bind(this)} okText='确认' cancelText='取消' title='确认删除?'>
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                           </div>
                        </div>
                    )
                }
            }
        ]
        return (
            <div>
                <div className='pageTitle'><h1>学生违纪信息</h1></div>
                <div style={{ position: 'relative', bottom: 5, left: '95%' }}><EditDis /></div>
                <Table
                    dataSource={data}
                    columns={columns}
                />
            </div>
        )
    }
}