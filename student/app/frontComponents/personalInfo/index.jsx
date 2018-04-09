import React from 'react';
import { Form, Row, Col, Card, Button, Input, message, Radio } from 'antd';
import { webApi } from '../../utils';

const FromItem = Form.Item;
const RadioGroup = Radio.Group;

class PersonInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
            id: '',
            username: '',
            number: '',
            phone: '',
            college: '',
            profession: '',
            grade: '',
            house: '',
            idCard: '',
            sex:''
        }
    }
    componentDidMount() {
        const temp = localStorage.getItem('temp');
        let t = JSON.parse(temp);
       this.getPersonalInfo(t.id);
    }
    getPersonalInfo(id){
        webApi.get('/getPersonalInfo?id=' + id).then(data => {
            if (data.flag) {
                data.returnValue.map(key => {
                    this.setState({
                        id: id,
                        username: key.username,
                        number: key.userNumber,
                        phone: key.phone,
                        college: key.college,
                        profession: key.profession,
                        grade: key.grade,
                        house: key.house,
                        idCard: key.idCard,
                        sex:key.sex,
                    })
                })
            } else {
                message.error(data.returnValue)
            }
        })
    }
    handleChange() {
        this.setState({
            show: true
        })
    }
    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.id=this.state.id;
            webApi.post('/updatePersonalInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue)
                    this.getPersonalInfo(value.id);
                } else {
                    message.error(data.returnValue)
                }
            })
        })
        this.setState({
            show: false
        })
    }

    handleCancel() {
        this.setState({ show: false })
    }

    render() {
        const { show } = this.state;
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const cardStyle = {
            width: '60%',
            marginLeft: '19%',
            marginTop: '4%'
        }
        return (
            <Card title={<h1>个人信息</h1>} style={cardStyle}>
                <Form>
                    <Row>
                        <Col>
                            <FromItem label='姓名' {...formItemLayout}>
                                {show ? getFieldDecorator('username', {
                                    rules: [{ required: true, message: '姓名不能为空' }],
                                    initialValue:this.state.username
                                })(<Input />) : <h3>{this.state.username}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='性别' {...formItemLayout}>
                                {show ? getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '性别不能为空' }],
                                    initialValue:this.state.sex
                                })(<RadioGroup>
                                    <Radio value='男'>男</Radio>
                                    <Radio value='女'>女</Radio>
                                </RadioGroup>) : <h3>{this.state.sex}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='学号' {...formItemLayout}>
                                {show ? getFieldDecorator('number', {
                                    rules: [{ required: true, message: '学号不能为空' }],
                                    initialValue:this.state.number
                                })(<Input />) : <h3>{this.state.number}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='电话' {...formItemLayout}>
                                {show ? getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '电话不能为空' }],
                                    initialValue:this.state.phone
                                })(<Input />) : <h3>{this.state.phone}</h3>}
                            </FromItem>
                        </Col>

                        <Col>
                            <FromItem label='学院' {...formItemLayout}>
                                {show ? getFieldDecorator('college', {
                                    rules: [{ required: true, message: '学院不能为空' }],
                                    initialValue:this.state.college
                                })(<Input />) : <h3>{this.state.college}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='专业' {...formItemLayout}>
                                {show ? getFieldDecorator('profession', {
                                    rules: [{ required: true, message: '专业不能为空' }],
                                    initialValue:this.state.profession
                                })(<Input />) : <h3>{this.state.profession}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='班级' {...formItemLayout}>
                                {show ? getFieldDecorator('grade', {
                                    rules: [{ required: true, message: '班级不能为空' }],
                                    initialValue:this.state.grade
                                })(<Input />) : <h3>{this.state.grade}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='宿舍' {...formItemLayout}>
                                {show ? getFieldDecorator('house', {
                                    rules: [{ required: true, message: '宿舍不能为空' }],
                                    initialValue:this.state.house
                                })(<Input />) : <h3>{this.state.house}</h3>}
                            </FromItem>
                        </Col>
                        <Col>
                            <FromItem label='身份证号' {...formItemLayout}>
                                {show ? getFieldDecorator('idCard', {
                                    rules: [{ required: true, message: '身份证号不能为空' }],
                                    initialValue:this.state.idCard
                                })(<Input />) : <h3>{this.state.idCard}</h3>}
                            </FromItem>
                        </Col>

                    </Row>
                    <div style={{ float: 'right' }}>
                        {!show
                            ? <Button type='primary' onClick={this.handleChange.bind(this)}>修改</Button>
                            :
                            <div>
                                <Button type='primary' onClick={this.handleSubmit.bind(this)}>保存</Button>
                                <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.handleCancel.bind(this)}>取消</Button>
                            </div>}

                    </div>
                </Form>
            </Card>
        )
    }
}
PersonInfo = Form.create()(PersonInfo)
export default PersonInfo