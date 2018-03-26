import React from 'react';
import { Card, message } from 'antd';
import '../../index.css';
import EditInfo from './components/editInfo';
import AddBorrow from './components/addBorrow'
import Examine from './components/examine'
import { webApi, XTable } from '../../utils';
import moment from 'moment'


export default class Index extends React.Component {
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
        this.getList(this.state.index, this.state.size)
    }
    getList(index, size) {
        let arr = []
        webApi.get('/getRegisterInfo?index=' + index + '&size=' + size + '&type=borrow').then(data => {
            if (data.flag) {
                data.returnValue.map(key => {
                    arr.push({
                        startTime: moment(key.startTime).format('YYYY-MM-DD'),
                        endTime: key.endTime == '' ? '' : moment(key.endTime).format('YYYY-MM-DD'),
                        studentName: key.studentName,
                        class: key.class,
                        des: key.des,
                        borrowSth: key.borrowSth,
                        status: key.status,
                        id: key.id,
                        key: key.key
                    })
                })
                this.setState({
                    data: arr,
                    total: data.total
                })
            }
        })  
    }
    pageChange(index, size) {
        this.setState({ index, size })
        this.getList(index, size)
    }

    callBack(sta) {
        if (sta) {
            this.getList(this.state.index, this.state.size)
        }
    }

    render() {
        const { index, size, data, total } = this.state
        const columns = [
            { title: '借用人', dataIndex: 'studentName', },
            { title: '学院班级', dataIndex: 'class', },
            { title: '借用物品', dataIndex: 'borrowSth', },
            { title: '借用时间', dataIndex: 'startTime', },
            { title: '归还时间', dataIndex: 'endTime', },
            { title: '用途', dataIndex: 'des', },
            { title: '借用状态', dataIndex: 'status', render: (text, record) => <Examine callBack={this.callBack.bind(this)} data={record} /> },
            { title: '操作', dataIndex: 'n7', render: (text,record) => <EditInfo callBack={this.callBack.bind(this)} data={record} /> },
        ]
        return (
            <div>
                <div className='pageTitle'><h1>物品借用信息</h1></div>
                <div style={{ position: 'relative', bottom: 5, left: '95%' }}><AddBorrow callBack={this.callBack.bind(this)} /></div>
                <Card hoverable='noHovering'>
                    <XTable
                        data={data}
                        columns={columns}
                        index={index}
                        size={size}
                        total={total}
                        onChange={this.pageChange.bind(this)}
                    />
                </Card>
            </div>
        )
    }
}