import React from 'react';
import { Form, Input, Modal, Row, Col, message, Radio, Button, Popconfirm } from 'antd';
import { webApi } from '../../utils'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserEdit extends React.Component {
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

            value.userId=this.props.data.userId
            webApi.post('/updateUserInfo', value).then(data => {
                if (data.flag) {
                    message.success(data.returnValue)
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                   
                } else {
                    message.error('修改失败')
                }
            })
            this.setState({
                show: false
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
                    title='修改个人信息'
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
                                <FormItem label='身份证' {...formItemLayout}>
                                    <Col>{getFieldDecorator('idCard', {
                                        rules: [{ required: true, max: 19, message: '身份证不能为空' }]
                                    })(<Input  />)}</Col>
                                </FormItem>
                                <FormItem label='电话' {...formItemLayout}>
                                    <Col>{getFieldDecorator('phone', {
                                        rules: [{ required: true }]
                                    })(
                                        <Input />
                                    )}</Col>
                                </FormItem>
                                <FormItem label='学号' {...formItemLayout}>
                                    <Col>{getFieldDecorator('number', {
                                        rules: [{ required: true }]
                                    })(<Input />)}</Col>
                                </FormItem>
                                <FormItem label='学院' {...formItemLayout}>
                                    <Col>{getFieldDecorator('profession', {
                                        rules: [{ required: true, message: '学院不能为空' }]
                                    })(<Input />)}</Col>
                                </FormItem>
                                <FormItem label='专业' {...formItemLayout}>
                                    <Col>{getFieldDecorator('college', {
                                        rules: [{ required: true, message: '专业不能为空' }]
                                    })(<Input />)}</Col>
                                </FormItem>
                                <FormItem label='班级' {...formItemLayout}>
                                    <Col>{getFieldDecorator('grade', {
                                        rules: [{ required: true, message: '班级不能为空' }]
                                    })(<Input />)}</Col>
                                </FormItem>
                                <FormItem label='宿舍' {...formItemLayout}>
                                    <Col>{getFieldDecorator('house', {
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
UserEdit = Form.create()(UserEdit)
export default UserEdit