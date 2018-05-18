import React from 'react';
import { Button, Input, Modal, message, Popconfirm, Form, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import { webApi } from '../../../utils';

const TextArea = Input.TextArea
const FormItem = Form.Item;

class EditVisiterInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            isShow: false,
            date: ''
        }
    }

    showModal() {
        if (this.props.data) {
          //  this.props.data.startTime = moment(this.props.data.startTime,'YYYY-MM-DD')
            this.props.form.setFieldsValue(this.props.data)
        }
        this.setState({ isShow: true })
    }

    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            if (this.state.date == '') {
                message.error('日期不能为空');
                return
            }
            value.startTime = this.state.date
            value.id = this.props.data.id;
            webApi.post('/updateRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info('修改成功');
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error('修改失败')
                }
            })
        })
        this.setState({
            isShow: false
        })
    }

    handleConfirm() {
        let searchCondition = {};
        searchCondition.id = this.props.data.id;
        webApi.post('/deleteRegisterInfo', searchCondition).then(data => {
            if (data.flag) {
                message.info('删除成功')
                if (this.props.callBack) {
                    this.props.callBack(data.flag)
                }
            } else {
                message.error('删除失败，服务器异常')
            }
        })
    }

    handleCancel() {
        this.setState({
            isShow: false
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
                <Button type='primary' size='small' onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm onConfirm={this.handleConfirm.bind(this)} cancelText='取消' okText='确认' title='确认删除'>
                    <Button type='danger' size='small' style={{ marginLeft: 10 }}>删除</Button>
                </Popconfirm>
                <Modal
                    title='编辑信息'
                    visible={this.state.isShow}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText='确认'
                    cancelText='取消'
                >
                    <Form>
                        <Row>
                            <FormItem label='学生姓名' {...formItemLayout}>
                                <Col>
                                    {getFieldDecorator('studentName', {
                                        rules: [{ required: true, max: 10, message: '学生姓名不能为空且长度不能超过10', }]
                                    })(<Input />)}
                                </Col>
                            </FormItem>
                            <FormItem label='来访姓名' {...formItemLayout}>
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
                                    <DatePicker defaultValue={moment(this.props.data.startTime,'YYYY-MM-DD')} placeholder='请选择日期' onChange={this.dateChange.bind(this)} />
                                </Col>
                            </FormItem>
                            <FormItem label='身份证' {...formItemLayout}>
                                <Col>
                                    {getFieldDecorator('idCard', {
                                        rules: [{ required: true, max: 18, message: '身份证不能为空并且不能超过18位', }]
                                    })(<Input maxLength='19' />)}
                                </Col>
                            </FormItem>
                            <FormItem label='来访原因' {...formItemLayout}>
                                <Col>
                                    {getFieldDecorator('des', {
                                        rules: [{ required: true, max: 50, message: '来访原因不能为空且不能超过50', }]
                                    })(<TextArea rows='3' maxLength='51' />)}
                                </Col>
                            </FormItem>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
EditVisiterInfo = Form.create()(EditVisiterInfo);
export default EditVisiterInfo