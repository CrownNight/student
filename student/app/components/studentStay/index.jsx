import React from 'react';
import { Card, Row, Col, message, Button } from 'antd';
import EditPersonalInfo from './components/editPersonalInfo';
import { webApi, XTable } from '../../utils';
import Examine from './components/examine'



export default class Accommodation extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            index: 1,
            size: 5,
            total: 0
        }
    }
    componentDidMount() {
        const {index,size}=this.state
        this.getList(index,size)
    }
    getList(index,size){
        webApi.get('/getListInfo?index='+index+'&size='+size).then(data=>{
            if(data.flag){
                this.setState({
                    data:data.returnValue,
                    total:data.total
                })
            }
        })
    }

    handleChange(index, size) {
        this.setState({index,size});
        this.getList(index,size)
    }
    callBack(sta) {
        const {index,size}=this.state
        if(sta){this.getList(index,size)}
    }
    render() {
        const { data, index, size, total } = this.state
        const columns = [
            { title: '姓名', dataIndex: 'username', render: (text, record) => <EditPersonalInfo data={record} callBack={this.callBack.bind(this)} /> },
            { title: '院系', dataIndex: 'department',  },
            { title: '专业', dataIndex: 'major',  },
            { title: '班级', dataIndex: 'grade',  },
            { title: '宿舍及房间号', dataIndex: 'house',  },
            { title: '是否外宿', dataIndex: 'isStayOut', },
            { title: '外宿原因', dataIndex: 'isStayOutDes',  },
            { title: '是否退宿', dataIndex: 'isTuisu', },
            { title: '退宿原因', dataIndex: 'isTuisuDes',  },
            { title: '审核描述', dataIndex: 'isPassDes',  },
            { title: '审核', dataIndex: 'isPass',render:(text,record)=><Examine data={record} callBack={this.callBack.bind(this)}/>  }
        ]
        return (
            <div>
                <Card title={<h1>学生外宿管理</h1>}>
                    <Row>
                        <Col>
                            <XTable
                                data={data}
                                columns={columns}
                                index={index}
                                total={total}
                                size={size}
                                onChange={this.handleChange.bind(this)}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}