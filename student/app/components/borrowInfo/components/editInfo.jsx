import React from 'react';
import { Card, Form, Input, Row, Col, message, Modal, Button, Popconfirm, DatePicker } from 'antd';
import { webApi } from '../../../utils'
import moment from 'moment'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class EditInfo extends React.Component {
    constructor() {
        super();
        this.state = { show: false, date: '' }
    }
    showModal() {
        // this.props.data.startTime=moment(this.props.data.startTime,'YYYY-MM-DD')
        this.props.form.setFieldsValue(this.props.data)
        this.setState({ show: true })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            if (this.state.date == '') {
                message.error('日期不能为空');
                return
            }
            value.id = this.props.data.id;
            value.status = this.props.data.status
            value.startTime = this.state.date
            webApi.post('/updateRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue);
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error(data.returnValue)
                }
            })
        })
        this.setState({ show: false })
    }
    handleCancel() {
        this.setState({ show: false })
    }
    //删除点击了确定
    handleDel() {
        let condition = {};
        condition.id = this.props.data.id;
        webApi.post('/deleteRegisterInfo', condition).then(data => {
            if (data.flag) {
                message.info(data.returnValue);
                if (this.props.callBack) {
                    this.props.callBack(data.flag)
                }
            } else {
                message.error(data.returnValue)
            }
        })
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
                <Button type='primary' size='small' disabled={this.props.data.status == '已归还' ? true : false} onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm title='确认删除？' onConfirm={this.handleDel.bind(this)} okText='确定' cancelText='取消'>
                    <Button type='danger' size='small' style={{ marginLeft: 10 }}>删除</Button>
                </Popconfirm>
                <Modal
                    title='编辑借用信息'
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
                                    <DatePicker defaultValue={moment(this.props.data.startTime,'YYYY-MM-DD')} placeholder='请选择借用时间' onChange={this.dateChange.bind(this)} />
                                </FormItem>
                            </Col>
                            {/* <Col>
                                <FormItem label='归还时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col> */}
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
EditInfo = Form.create()(EditInfo)
export default EditInfo