import React from 'react';
import { Modal, Button, Form, Input, message, Select, Row, Col, Popconfirm, DatePicker } from 'antd';
import moment from 'moment'
import { webApi } from '../../../utils'

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

class EditDis extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    showModal() {
        if (this.props.data) {
            this.props.data.startTime = moment(this.props.data.startTime, 'YYYY-MM-DD')
            this.props.form.setFieldsValue(this.props.data)
        }
        this.setState({
            show: true
        })
    }
    hanldeOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            if (this.props.data) {
                value.id = this.props.data.id
                value.startTime = moment(value.startTime).format('YYYY-MM-DD')
                let url = '/updateRegisterInfo'
                this.updateInfo(url, value)
            } else {
                value.type = 'disc';
                value.startTime = moment(value.startTime).format('YYYY-MM-DD')
                let url = '/addRegisterInfo'
                this.updateInfo(url, value)
            }
        })
    }
    updateInfo(url, value) {
        webApi.post(url, value).then(data => {
            if (data.flag) {
                message.info(data.returnValue);
                if (this.props.callBack) {
                    this.props.callBack(data.flag)
                }
                this.setState({
                    show: false
                })
            } else {
                message.error(data.returnValue)
            }
        })
    }
    handleCancel() {
        this.setState({
            show: false
        })
    }


    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' onClick={this.showModal.bind(this)} size={this.props.data ? 'small' : 'default'}>{this.props.data ? '编辑' : '添加'}</Button>
                <Modal title={this.props.data ? '编辑违纪信息' : '添加违纪信息'} visible={this.state.show} onOk={this.hanldeOk.bind(this)} onCancel={this.handleCancel.bind(this)} okText='确认' cancelText='取消'>
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='违纪人' {...formItemLayout}>
                                    {getFieldDecorator('studentName', {
                                        rules: [{ required: true, message: '违纪人不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='违纪时间' {...formItemLayout}>
                                    {getFieldDecorator('startTime', {
                                        rules: [{ required: true, message: '违纪人不能为空' }]
                                    })(<DatePicker placeholder='请选择时间' />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='违纪程度' {...formItemLayout}>
                                    {getFieldDecorator('discipline', {
                                        rules: [{ required: true, message: '违纪程度不能为空' }]
                                    })(
                                        <Select>
                                            <Option value='非常严重'>非常严重</Option>
                                            <Option value='严重'>严重</Option>
                                            <Option value='一般'>一般</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='违纪描述' {...formItemLayout}>
                                    {getFieldDecorator('des', {
                                        rules: [{ required: true, message: '违纪描述不能为空' }]
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
EditDis = Form.create()(EditDis)
export default EditDis