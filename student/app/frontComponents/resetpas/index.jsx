import React from 'react';
import { Form, Card, Input, message, Row, Col ,Button} from 'antd';
import {webApi} from '../../utils';

const FormItem = Form.Item;

class ResetPassword extends React.Component {
    constructor() {
        super()
    }

    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err) return;

            if(value.newpass!=value.renewpass){
                 message.error('两次密码不一致');
                 return
            }

            webApi.post('/updatePassword',value).then(data=>{
                if(data.flag){
                    message.info(data.returnValue)
                }else{
                    message.error(data.returnValue)
                }
            })
        })
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
            marginTop: '4%'
        }
        return (
            <Card title={<h2>修改密码</h2>} style={cardStyle}>
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
                            <FormItem label='身份证' {...formItemLayout}>
                                {getFieldDecorator('idCard', {
                                    rules: [{ required: true }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='新密码' {...formItemLayout}>
                                {getFieldDecorator('newpass', {
                                    rules: [{ required: true }]
                                })(<Input type='password' />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='重复新密码' {...formItemLayout}>
                                {getFieldDecorator('renewpass', {
                                    rules: [{ required: true }]
                                })(<Input type='password' />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ float: 'right' }}>
                        <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                        {/* <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.resetInfo.bind(this)}>重置</Button> */}
                    </div>
                </Form>
            </Card>
        )
    }
}
ResetPassword=Form.create()(ResetPassword);
export default ResetPassword