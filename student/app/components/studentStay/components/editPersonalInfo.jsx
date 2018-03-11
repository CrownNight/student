import React from 'react';
import { Modal, message, Form, Input, Row, Col,Radio,Button } from 'antd';

const FormItem = Form.Item;

export default class EditPersonalInfo extends React.Component {
    constructor() {
        super();
        this.state={
            show:false
        }
    }
    showModal(){
        this.setState({
            show:true
        })
    }

    handleConfirm(){
        this.setState({
            show:false
        })
    }

    handleCancel() {
        this.setState({
            show:false
        })
    }

    render() {
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:20}
        }
        return (
            <div>
                <a type='primary' onClick={this.showModal.bind(this)}>李四</a>
                <Modal title='编辑个人信息' visible={this.state.show} onOk={this.handleConfirm.bind(this)} onCancel={this.handleCancel.bind(this)}>
                    <Form>
                        <Row gutter='16'>
                            <Col>
                                <FormItem label='姓名' {...formItemLayout}>
                                    <Col>
                                        <Input />
                                    </Col>
                                </FormItem>
                                <FormItem label='院系' {...formItemLayout}>
                                    <Col>
                                        <Input />
                                    </Col>
                                </FormItem>
                                <FormItem label='宿舍及房间号' {...formItemLayout}>
                                    <Col>
                                        <Input />
                                    </Col>
                                </FormItem>
                                <FormItem label='是否外宿' {...formItemLayout}>
                                    <Col>
                                       <Radio>是</Radio>
                                       <Radio>否</Radio>
                                    </Col>
                                </FormItem>
                                <FormItem label='外宿原因' {...formItemLayout}>
                                    <Col>
                                        <Input type='textarea' />
                                    </Col>
                                </FormItem>
                                <FormItem label='是否退宿' {...formItemLayout}>
                                    <Col>
                                       <Radio>是</Radio>
                                       <Radio>否</Radio>
                                    </Col>
                                </FormItem>
                                <FormItem label='退宿原因' {...formItemLayout}>
                                    <Col>
                                        <Input type='textarea' />
                                    </Col>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}