import React from 'react';
import {Tabs,Button,Card,Icon,Input,Table,Form,Checkbox,Radio} from 'antd';
import './index.css'
import AddVisiterInfo from './components/addVisitInfo'

const FormItem = Form.Item;

const columns=[
    {title:'学生姓名',dataIndex:'n1',render:(text)=>'小明'},
    {title:'来访人姓名',dataIndex:'n2',render:(text)=>'张三'},
    {title:'双方关系',dataIndex:'n3',render:(text)=>'父子'},
    {title:'来访时间',dataIndex:'n4',render:(text)=>'2018-3-12'},
    {title:'来访人身份证',dataIndex:'n5',render:(text)=>'13245646'},
    {title:'来访原因',dataIndex:'n6',render:(text)=>'21364'},
    {title:'操作',dataIndex:'n7',render:(text)=>''}
]
const data=[
    {key:1},{key:2},{key:3},{key:4},{key:5},{key:6}
]

export default class Visreg extends React.Component{
    constructor() {
        super()
    }
    componentDidMount() {

    }

    render() {
        return(
            <div>
                <Card noHovering title={<h1>来访登记</h1>}>
                    <div style={{position:'relative',bottom:5,left:'95%'}}>
                        <AddVisiterInfo />
                    </div>
                    <Table
                    columns={columns}
                    dataSource={data}
                    />
                </Card>
            </div>
        )
    }
}