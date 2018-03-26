import React from 'react';
import { Input, Form, Row, Col, Card, Button, message, Table } from 'antd';
import EditRepaire from './components/editRepaire';
import AddRepaire from './components/addRepaire';
import Examine from './components/examine'
import moment from 'moment';
import { webApi, XTable } from '../../utils';

const FormItem = Form.Item;


export default class Repir extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            index: 1,
            size: 5,
            total: 0
        }
    }
    componentDidMount() {
        this.getList(this.state.index, this.state.size);
    }

    getList(index, size) {
        let arr = []
        webApi.get('/getRegisterInfo?index=' + index + '&size=' + size + '&type=repair').then(data => {
            if (data.flag) {
                data.returnValue.map(item => {
                    arr.push({
                        studentName: item.studentName,
                        key: item.key,
                        id: item.id,
                        des: item.des,
                        repaireHouse: item.repaireHouse,
                        startTime: moment(item.startTime).format('YYYY-MM-DD'),
                        endTime: item.endTime == '' ? '' : moment(item.endTime).format('YYYY-MM-DD'),
                        status: item.status
                    })
                })
                this.setState({
                    total: data.total,
                    data: arr
                })
            } else {
                message.error('列表获取失败')
            }
        })
    }
    pageChange(index, size) {
        this.setState({ index, size })
        this.getList(index, size);
    }

    callBack(sta) {
        if (sta) {
            this.getList(this.state.index, this.state.size)
        }
    }

    render() {
        const { data, index, size, total } = this.state
        const columns = [
            { title: '报修人', dataIndex: 'studentName', },
            { title: '报修时间', dataIndex: 'startTime', },
            { title: '报修宿舍', dataIndex: 'repaireHouse', },
            { title: '详细报修描述', dataIndex: 'des', },
            { title: '报修状态', dataIndex: 'status', render: (text, record) => <Examine data={record} callBack={this.callBack.bind(this)} /> },
            { title: '解决时间', dataIndex: 'endTime', },
            { title: '操作', dataIndex: 'n6', render: (text, record) => <EditRepaire data={record} callBack={this.callBack.bind(this)} /> }
        ]
        return (
            <div>
                <div style={{ marginLeft: 10 }}><h1>维修信息</h1></div>
                <div style={{ position: 'relative', bottom: 5, left: '95%' }}><AddRepaire callBack={this.callBack.bind(this)} /></div>
                <Card >
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