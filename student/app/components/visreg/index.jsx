import React from 'react';
import { Tabs, Button, Card, Icon, Input, Table, Form, Checkbox, Radio } from 'antd';
import moment from 'moment'
import './index.css'
import AddVisiterInfo from './components/addVisitInfo';
import EditVisiterInfo from './components/EditVisitInfo'
import { webApi, XTable } from '../../utils';

const FormItem = Form.Item;


export default class Visreg extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 1,
            size: 5,
            total: 0,
            data: []
        }
    }
    componentDidMount() {
        this.getList(this.state.index, this.state.size);
    }

    getList(index, size) {
        let arr=[]
        webApi.get('/getRegisterInfo?index=' + index + '&size=' + size + '&type=regis').then(data => {
            if (data.flag) {
                data.returnValue.map(key=>{
                   arr.push({
                    startTime:moment(key.startTime).format('YYYY-MM-DD'),
                    key:key.id,
                    id:key.id,
                    visName:key.visName,
                    studentName:key.studentName,
                    idCard:key.idCard,
                    relationship:key.relationship,
                    des:key.des
                   })
                })              
                this.setState({                   
                    data: arr,
                    total: data.total
                })
            }
        })
    }

    pageSizeChange(index, size) {
        this.setState({ index, size });
        this.getList(index, size);
    }

    callBack(sta) {
        const { index, size } = this.state;
        if (sta) {
            this.getList(index, size);
        }
    }

    render() {
        const { data, index, size, total } = this.state;
        const columns = [
            { title: '学生姓名', dataIndex: 'studentName' },
            { title: '来访人姓名', dataIndex: 'visName', },
            { title: '双方关系', dataIndex: 'relationship' },
            { title: '来访时间', dataIndex: 'startTime' },
            { title: '来访人身份证', dataIndex: 'idCard' },
            { title: '来访原因', dataIndex: 'des' },
            { title: '操作', dataIndex: 'n7', render: (text, record) => <EditVisiterInfo data={record} callBack={this.callBack.bind(this)} /> }
        ]
        return (
            <div>
                <Card hoverable='noHovering'  title={<h1>来访登记</h1>}>
                    <div style={{ position: 'relative', bottom: 5, left: '95%' }}>
                        <AddVisiterInfo callBack={this.callBack.bind(this)} />
                    </div>
                    <XTable
                        columns={columns}
                        data={data}
                        index={index}
                        size={size}
                        total={total}
                        onChange={this.pageSizeChange.bind(this)}
                    />
                </Card>
            </div>
        )
    }
}