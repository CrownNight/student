import React from 'react';
import { Button, message, Form, Input, Modal, Card, Row, Col } from 'antd';
import {webApi} from '../../../utils';

const FormItem = Form.Item;

class AddHouse extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    showModal() {
        this.setState({
            show: true
        })
    }

    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            webApi.post('/addHouse', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue)
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error(data.errorMessage)
                }
            })
        })
        this.setState({ show: false })
    }

    handleCancel() {
        this.setState({ show: false })
    }

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' size='middle' onClick={this.showModal.bind(this)}>添加宿舍</Button>
                <Modal title='添加宿舍' okText='确认' cancelText='取消' visible={this.state.show} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='宿舍号' {...formItemLayout}>
                                    {getFieldDecorator('house', {
                                        rules: [{ required: true, message: '宿舍号不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='所属楼栋' {...formItemLayout}>
                                    {getFieldDecorator('building', {
                                        rules: [{ required: true, message: '宿舍号不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='床位' {...formItemLayout}>
                                    {getFieldDecorator('bed', {
                                        rules: [{ required: true, message: '宿舍号不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='桌椅' {...formItemLayout}>
                                    {getFieldDecorator('tables', {
                                        rules: [{ required: true, message: '宿舍号不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='饮水机' {...formItemLayout}>
                                    {getFieldDecorator('dispenser', {
                                        rules: [{ required: true, message: '宿舍号不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
AddHouse = Form.create()(AddHouse);
export default AddHouse