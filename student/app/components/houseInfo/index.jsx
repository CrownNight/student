import React from 'react';
import { Card, Col, Button, message } from 'antd';
import AddHouse from './components/addHouse';
import EditHouse from './components/editHouse';
import { webApi, XTable } from '../../utils'


export default class HouseInfo extends React.Component {
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
        const { index, size } = this.state;
        this.getList(index, size);
    }

    getList(index, size) {
        webApi.get('/getHouseInfoList?index=' + index + '&size=' + size).then(data => {
            if (data.flag) {
                this.setState({
                    data: data.returnValue,
                    total: data.total
                })
            } else {
                message.error(data.errorMessage)
            }
        })
    }


    pageChange(index, size) {
        this.setState({
            index, size
        })
        this.getList(index, size)
    }

    callBack(sta) {
        if (sta) {
            this.getList(this.state.index, this.state.size);
        }
    }
    render() {
        const { index, size, data, total } = this.state;
        const columns = [
            { title: '宿舍号', dataIndex: 'house' },
            { title: '所属楼栋', dataIndex: 'building', },
            { title: '床位', dataIndex: 'bed', },
            { title: '桌椅', dataIndex: 'tables',  },
            { title: '饮水机', dataIndex: 'dispenser' },
            { title: '操作', dataIndex: 'n6', render: (text, record) => <EditHouse data={record} callBack={this.callBack.bind(this)} /> },
        ]
        return (
            <div>
                <div style={{ marginLeft: 15, marginTop: 15, marginBottom: 15 }}><h1>宿舍信息管理</h1></div>
                <Col>
                    <Card>
                        <div style={{ position: 'relative', bottom: 10, left: '93%' }}><AddHouse callBack={this.callBack.bind(this)} /></div>
                        <Col>
                            <XTable columns={columns} data={data} index={index} size={size} total={total} onChange={this.pageChange.bind(this)} />
                        </Col>
                    </Card>
                </Col>
            </div>
        )
    }
}