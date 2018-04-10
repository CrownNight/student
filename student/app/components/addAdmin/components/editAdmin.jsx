import React from 'react';
import { Form, Input, Modal, Row, Col, message, Radio, Button, Popconfirm } from 'antd';
import { webApi } from '../../../utils'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class EditAdmin extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    showModal() {
        let item = this.props.data
        this.props.form.setFieldsValue(item)
        this.setState({
            show: true
        })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            webApi.post('/updateUserInfo', value).then(data => {
                if (data.flag) {
                    message.success(data.returnValue)
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                    this.setState({
                        show: false
                    })
                } else {
                    message.error('修改失败')
                }
            })

        })

    }
    handleCancel() {
        this.setState({ show: false })
    }

    handleConfirm() {
        const { userId } = this.props.data;
        let searchCondition={};
        searchCondition.userId=userId
        webApi.post('/deleteUser', searchCondition).then(data => {
            if (data.flag) {
                message.info('删除成功')
                if(this.props.callBack){
                    this.props.callBack(data.flag)
                }
            } else {
                message.error('删除失败')
            }
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
                <Button type='primary' size='small' onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm onConfirm={this.handleConfirm.bind(this)} title='确认删除?' okText='确认' cancelText='取消'>
                    <Button type='ghost' style={{ color: 'red', marginLeft: 10 }} size='small'>删除</Button>
                </Popconfirm>
                <Modal
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.show}
                    title='编辑个人信息'
                    okText='确认'
                    cancelText='取消' >
                    <Form>
                        <Row gutter={16}>
                            <Col>
                                {/* <FormItem label='姓名' {...formItemLayout} style={{ display: 'none' }}>
                                    <Col>{
                                        getFieldDecorator('userId')(
                                            <Input />
                                        )
                                    }</Col>
                                </FormItem> */}
                                <FormItem label='姓名' {...formItemLayout}>
                                    <Col>{
                                        getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '姓名不能为空' }]
                                        })(
                                            <Input />
                                        )
                                    }</Col>
                                </FormItem>
                                <FormItem label='性别' {...formItemLayout}>
                                    <Col offset={1}>
                                        {getFieldDecorator('sex', {
                                            rules: [{ required: true }]
                                        })(
                                            <RadioGroup>
                                                <Radio value='男'>男</Radio>
                                                <Radio value='女'>女</Radio>
                                            </RadioGroup>
                                        )}
                                    </Col>
                                </FormItem>
                                <FormItem label='电话' {...formItemLayout}>
                                    <Col>{getFieldDecorator('phone', {
                                        rules: [{ required: true }]
                                    })(
                                        <Input />
                                    )}</Col>
                                </FormItem>                             
                                <FormItem label='身份证' {...formItemLayout}>
                                    <Col>{getFieldDecorator('idCard', {
                                        rules: [{ required: true }]
                                    })(<Input />)}</Col>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>

                </Modal>
            </div>
        )
    }
}
EditAdmin = Form.create()(EditAdmin)
export default EditAdmin