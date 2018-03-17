import React from 'react';
import { Button, Form, message, Row, Col, Input, Modal, Radio, Card, Popconfirm } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class EditRepaire extends React.Component {
    constructor() {
        super()
        this.state = { show: false ,RadioValue:1}
    }

    showModal() {
        this.setState({
            show: true
        })
    }
    handleOk() {
        this.setState({ show: false })
    }
    handleCancel() {
        this.setState({ show: false })
    }
    //点击了删除
    handleDel() {

    }

    handleRadioChange(e){
        this.setState({RadioValue:e.target.value})
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' size='small' onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm title='确认删除？' onConfirm={this.handleDel.bind(this)} okText='确定' cancelText='取消'>
                    <Button type='danger' size='small' style={{ marginLeft: 10 }}>删除</Button>
                </Popconfirm>
                <Modal visible={this.state.show} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} width={600} title='编辑维修信息' >
                    <Form>
                        <Row gutter='16'>
                            <Col>
                                <FormItem label='报修人' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='解决时间' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修人' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修宿舍' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修描述' {...formItemLayout}>
                                    <Input.TextArea rows='5' />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修状态' {...formItemLayout}>
                                    <RadioGroup onChange={this.handleRadioChange.bind(this)}>
                                        <Radio value={1}>已解决</Radio>
                                        <Radio value={2}>未解决</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}