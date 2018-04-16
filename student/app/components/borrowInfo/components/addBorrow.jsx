import React from 'react';
import { Card, Form, Input, Row, Col, message, Modal, Button, DatePicker } from 'antd';
import { webApi } from '../../../utils';
import moment from 'moment'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AddBorrow extends React.Component {
    constructor() {
        super();
        this.state = { show: false, date: '' }
    }
    showModal() {
        this.setState({ show: true })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            if (this.state.date == '') {
                message.error('日期不能为空');
                return
            }
            value.type = 'borrow';
            value.status = '未归还'
            value.startTime = this.state.date
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
    handleCancel() {
        this.setState({ show: false })
    }

    dateChange(date, dateString) {
        this.setState({ date: dateString })
    }
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' onClick={this.showModal.bind(this)}>添加</Button>
                <Modal
                    title='添加借用信息'
                    visible={this.state.show}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText='确定'
                    cancelText='取消'
                >
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
                                    <DatePicker placeholder='请选择借用时间' onChange={this.dateChange.bind(this)} />
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
                    </Form>
                </Modal>
            </div>
        )
    }
}
AddBorrow = Form.create()(AddBorrow)
export default AddBorrow