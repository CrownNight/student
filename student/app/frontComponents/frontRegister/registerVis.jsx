import React from 'react';
import { Tabs, Button, Card, Icon, Input, Table, Form, Checkbox, Modal, Row, Col, message, DatePicker } from 'antd';
import moment from 'moment'
import { webApi } from '../../utils';

const FormItem = Form.Item;
const TextArea = Input.TextArea

class AddVisiterInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            studentName: '',
            visName: '',
            relationship: '',
            startTime: '',
            idCard: '',
            des: '',
        }
    }

    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.type = 'regis'
            value.startTime = moment().lang(value.startTime).format('YYYY-MM-DD')
            webApi.post('/addRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue);                  
                } else {
                    message.error(data.returnValue)
                }
            })
        })
        this.setState({ show: false })
    }

    resetInfo() {
        this.props.form.setFieldsValue(this.state)
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
            <Card title={<h1>来访信息登记</h1>} style={cardStyle}>
                <Form>
                    <Row>
                        <FormItem label='学生姓名' {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('studentName', {
                                    rules: [{ required: true, max: 10, message: '学生姓名不能为空且长度不能超过10', }]
                                })(<Input />)}
                            </Col>
                        </FormItem>
                        <FormItem label='来访人姓名' {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('visName', {
                                    rules: [{ required: true, max: 10, message: '来访人姓名不能为空且长度不能超过10', }]
                                })(<Input />)}
                            </Col>
                        </FormItem>
                        <FormItem label='双方关系' {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('relationship', {
                                    rules: [{ required: true, message: '关系不能为空', }]
                                })(<Input />)}
                            </Col>
                        </FormItem>
                        <FormItem label='来访时间' {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('startTime', {
                                    rules: [{ required: true, }]
                                })(<DatePicker placeholder='请选择日期' />)}
                            </Col>
                        </FormItem>
                        <FormItem label='来访身份证' {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('idCard', {
                                    rules: [{ required: true, message: '身份证不能为空', }]
                                })(<Input />)}
                            </Col>
                        </FormItem>
                        <FormItem label='来访原因' {...formItemLayout}>
                            <Col>
                                {getFieldDecorator('des', {
                                    rules: [{ required: true, message: '来访原因不能为空', }]
                                })(<TextArea rows='3' />)}
                            </Col>
                        </FormItem>
                    </Row>
                    <div style={{ float: 'right' }}>
                        <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                        <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.resetInfo.bind(this)}>重置</Button>
                    </div>
                </Form>
            </Card>
        )
    }
}
AddVisiterInfo = Form.create()(AddVisiterInfo)
export default AddVisiterInfo