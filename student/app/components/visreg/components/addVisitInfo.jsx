import React from 'react';
import { Tabs, Button, Card, Icon, Input, Table, Form, Checkbox, Modal, Row, Col ,message,DatePicker} from 'antd';
import moment from 'moment'
import '../index.css'
import {webApi } from '../../../utils';

const FormItem = Form.Item;
const TextArea = Input.TextArea

 class AddVisiterInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false,
            date:""
        }
    }
    showModal() {
        this.setState({ show: true })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            if(this.state.date==''){
                message.error('日期不能为空')
                return
            }
            value.type='regis'
            value.startTime=this.state.date;
            webApi.post('/addRegisterInfo', value).then(data => {
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
    dateChange(date,dateString){
        this.setState({date:dateString})
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
                    title='添加来访信息'
                    visible={this.state.show}
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
                                <DatePicker  placeholder='请选择日期' onChange={this.dateChange.bind(this)}/>
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
                    </Form>
                </Modal>
            </div>
        )
    }
}
AddVisiterInfo= Form.create()(AddVisiterInfo)
export default AddVisiterInfo