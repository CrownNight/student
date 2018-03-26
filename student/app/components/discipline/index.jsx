import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import '../../index.css';
import EditDis from './components/editDis';
import { webApi, XTable } from '../../utils';
import moment from 'moment'


export default class Discipline extends React.Component {
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
        webApi.get('/getRegisterInfo?index=' + index + '&size=' + size + '&type=disc').then(data => {
            if (data.flag) {
                data.returnValue.map(key => {
                    arr.push({
                        startTime: moment(key.startTime).format('YYYY-MM-DD'),
                        key: key.key,
                        id: key.id,
                        studentName: key.studentName,
                        discipline: key.discipline,
                        des: key.des
                    })
                })
                this.setState({
                    data: arr,
                    total: data.total
                })
            } else {
                message.error('获取列表失败')
            }
        })
    }
    handleConfirm(id) {
        let condition = {};
        condition.id = id;
        webApi.post('/deleteRegisterInfo', condition).then(data => {
            if (data.flag) {
                message.info(data.returnValue);
                this.getList(this.state.index, this.state.size)
            } else {
                message.error(data.returnValue)
            }
        })
    }

    pageChange(index, size) {
        this.setState({ index, size });
        this.getList(index, size)
    }

    callBack(sta) {
        if (sta) {
            this.getList(this.state.index, this.state.size)
        }
    }
    render() {
        const { data, index, size, total } = this.state
        const columns = [
            { title: '违纪人', dataIndex: 'studentName', },
            { title: '违纪时间', dataIndex: 'startTime', },
            { title: '违纪程度', dataIndex: 'discipline', },
            { title: '违纪描述', dataIndex: 'des', },
            {
                title: '操作', width: 130, dataIndex: 'n5', render: (text, record, index) => {
                    return (
                        <div>
                            <div style={{ float: 'left' }}><EditDis data={record} callBack={this.callBack.bind(this)} /></div>
                            <div style={{ float: 'right' }}>
                                <Popconfirm onConfirm={this.handleConfirm.bind(this, record.id)} okText='确认' cancelText='取消' title='确认删除?'>
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
                <div style={{ position: 'relative', bottom: 5, left: '95%' }}><EditDis callBack={this.callBack.bind(this)} /></div>
                <XTable
                    data={data}
                    columns={columns}
                    index={index}
                    size={size}
                    total={total}
                    onChange={this.pageChange.bind(this)}
                />
            </div>
        )
    }
}