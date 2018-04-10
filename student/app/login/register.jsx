import React from 'react';
import { Form, Card, Input, message, Row, Col ,Button,Radio} from 'antd';
import {webApi} from '../utils';

const FormItem = Form.Item;
const RadioGroup=Radio.Group;

class Register extends React.Component {
    constructor() {
        super()
    }

    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err) return;

            if(value.pass!=value.repass){
                message.error('两次密码不一致')
                return
            }

            value.type='否'
            webApi.post('/register',value).then(data=>{
                if(data.flag){
                    message.info('注册成功')
                    let newData={
                       id: data.returnValue[0].userId,
                       isAdmin:'否',
                       username:value.username
                    }
                    let result=JSON.stringify(newData)
                    localStorage.setItem('temp',result)
                    this.props.history.push('/front/news')                   
                }else{
                    message.error(data.returnValue)
                }
            })
        })
    }

    backToLogin(){
        this.props.history.push('/login')
    }

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const cardStyle = {
            width: '60%',
            marginLeft: '20%',
            marginTop: 80
        }
        return (
            <Card title={<h2>新用户注册</h2>} style={cardStyle}>
                <Form>
                    <Row>
                        <Col>
                            <FormItem label='姓名' {...formItemLayout}>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='性别' {...formItemLayout}>
                                {getFieldDecorator('sex', {
                                    rules: [{ required: true }]
                                })(<RadioGroup>
                                    <Radio value='男'>男</Radio>
                                    <Radio value='女'>女</Radio>
                                </RadioGroup>)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='电话' {...formItemLayout}>
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='身份证' {...formItemLayout}>
                                {getFieldDecorator('idCard', {
                                    rules: [{ required: true }]
                                })(<Input />)}
                            </FormItem>
                        </Col>                    
                        <Col>
                            <FormItem label='密码' {...formItemLayout}>
                                {getFieldDecorator('pass', {
                                    rules: [{ required: true }]
                                })(<Input type='password' />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='重复密码' {...formItemLayout}>
                                {getFieldDecorator('repass', {
                                    rules: [{ required: true }]
                                })(<Input type='password' />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ float: 'right' }}>
                        <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                        <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.backToLogin.bind(this)}>返回</Button>
                    </div>
                </Form>
            </Card>
        )
    }
}
Register=Form.create()(Register);
export default Register