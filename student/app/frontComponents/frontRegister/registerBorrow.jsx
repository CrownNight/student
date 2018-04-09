import React from 'react';
import { Card, Form, Input, Row, Col, message, Modal, Button, DatePicker } from 'antd';
import { webApi } from '../../utils';
import moment from 'moment'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AddBorrow extends React.Component {
    constructor() {
        super();
        this.state = {
            studentName: '',
            class: '',
            borrowSth: '',
            startTime: '',
            des: '',
        }
    }

    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.type = 'borrow';
            value.startTime = moment(value.startTime, 'YYYY-MM-DD')
            webApi.post('/addRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue);
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                    this.setState({ show: false })
                } else {
                    message.error(data.returnValue)
                }
            })
        })

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
            <Card title={<h1>物品借用登记</h1>} style={cardStyle}>
                <Form>
                    <Row>
                        <Col>
                            <FormItem label='借用人' {...formItemLayout}>
                                {getFieldDecorator('studentName', {
                                    rules: [{ required: true, message: '借用人不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='专业班级' {...formItemLayout}>
                                {getFieldDecorator('class', {
                                    rules: [{ required: true, message: '专业班级不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='借用物品' {...formItemLayout}>
                                {getFieldDecorator('borrowSth', {
                                    rules: [{ required: true, message: '借用物品不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='借用时间' {...formItemLayout}>
                                {getFieldDecorator('startTime', {
                                    rules: [{ required: true, message: '借用时间不能为空' }]
                                })(<DatePicker placeholder='请选择借用时间' />)}
                            </FormItem>
                        </Col>

                        <Col>
                            <FormItem label='用途' {...formItemLayout}>
                                {getFieldDecorator('des', {
                                    rules: [{ required: true, message: '用途不能为空' }]
                                })(<TextArea rows='3' />)}
                            </FormItem>
                        </Col>
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
AddBorrow = Form.create()(AddBorrow)
export default AddBorrow