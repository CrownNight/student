import React from 'react';
import { Tabs, Button, Card, Icon, Input, Table, Form, Checkbox, Modal, Row, Col } from 'antd';
import '../index.css'

const FormItem = Form.Item;

export default class AddVisiterInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    componentDidMount() {

    }
    showModal() {
        this.setState({ show: true })
    }
    handleOk() {
        this.setState({ show: false })
    }
    handleCancel() {
        this.setState({ show: false })
    }

    render() {
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
                    onCancel={this.handleCancel.bind(this)}>
                    <Form>
                        <Row>
                            <Col>
                                <FormItem
                                    label='学生姓名'
                                    {...formItemLayout}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem
                                    label='来访人姓名'
                                    {...formItemLayout}
                                >
                                    <Input />
                                </FormItem></Col>
                            <Col>
                                <FormItem
                                    label='双方关系'
                                    {...formItemLayout}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem
                                    label='来访时间'
                                    {...formItemLayout}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem
                                    label='身份证'
                                    {...formItemLayout}
                                >
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem
                                    label='来访原因'
                                    {...formItemLayout}
                                >
                                    <Input type='textarea' rows='5' />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}