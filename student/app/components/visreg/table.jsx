import React from 'react';
import { Tabs, Button, Card, Icon, Input, Table, Form, Checkbox, Radio } from 'antd';
import moment from 'moment'
import './index.css'
import AddVisiterInfo from './components/addVisitInfo';
import EditVisiterInfo from './components/EditVisitInfo'
import { webApi, XTable,Search } from '../../utils';
import '../../index.css'

const FormItem = Form.Item;


export default class Visreg extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 1,
            size: 5,
            total: 0,
            data: [],
            keywords:''
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
        if(this.state.keywords==''){
            this.getList(index, size);
        }else{
            this.getSearchList(this.state.keywords,index,size)
        }
    }

    callBack(sta) {
        const { index, size } = this.state;
        if (sta) {
            this.getList(index, size);
        }
    }
    search(value){
        const {index,size}=this.state;
        this.setState({keywords:value});
        if(value==''){
            this.getList(index,size)
        }else{
            this.getSearchList(value,index,size)
        }
    }
    getSearchList(keywords,index,size){
        webApi.get('/getRegisterSearch?keywords='+keywords+'&index='+index+'&size='+size+'&type=regis').then(data=>{
            let arr=[]
            if(data.flag){
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
            <div  className={'cardWrap'}>
                <Card hoverable='noHovering'  title={<h1>来访登记</h1>} style={{height:612}}>
                    <div style={{ height: 35 }}>
                            <div style={{ float: 'left', width: 300 }}><Search onSearch={this.search.bind(this)} placeholder='请输入学生姓名/来访时间' /></div>
                            <div style={{ float:'right' }}><AddVisiterInfo callBack={this.callBack.bind(this)} /></div>
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