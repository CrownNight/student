import React from 'react';
import { Modal, Button, Form, Input, message, Select, Row, Col ,Popconfirm} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class EditDis extends React.Component {
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
    hanldeOk() {
        this.setState({
            show: false
        })
    }
    handleCancel() {
        this.setState({
            show: false
        })
    }

 
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' onClick={this.showModal.bind(this)} size={this.props.data ? 'small':'default'}>{this.props.data ? '编辑':'添加'}</Button>
                <Modal title={this.props.data ? '编辑违纪信息':'添加违纪信息'} visible={this.state.show} onOk={this.hanldeOk.bind(this)} onCancel={this.handleCancel.bind(this)} okText='确认' cancelText='取消'>
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='违纪人' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='违纪时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='违纪程度' {...formItemLayout}>
                                    <Select>
                                        <Option value='1'>12</Option>
                                        <Option value='2'>123</Option>
                                        <Option value='3'>1234</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='违纪描述' {...formItemLayout}>
                                    <TextArea rows='5' />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}