import React from 'react';
import { Button, Form, Input, message, Row, Col, Modal } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class AddRepaire extends React.Component {
    constructor() {
        super();
        this.state = { show: false }
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
                <Modal title='添加报修信息' visible={this.state.show} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='报修人姓名' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>                          
                            <Col>
                                <FormItem label='报修时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修宿舍' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='描述' {...formItemLayout}>
                                    <Input.TextArea rows='5' placeholder='请描述报修详细信息' />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}