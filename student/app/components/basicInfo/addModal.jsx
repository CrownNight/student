import React from 'react';
import {Input, Modal, Button, Form, Row, Col,Radio,Checkbox} from 'antd';


const FormItem = Form.Item;
export default class AddModal extends React.Component {
    constructor() {
        super();
        this.state = {
            visibale: false
        }
    }

    showModal() {
        this.setState({
            visibale: true
        })
    }
    handleOk() {
        this.setState({
            visibale:false
        })
    }
    handleCancel(){
        this.setState({
            visibale:false
        })
    }

    render() {
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:20}
        }
        return (
            <div>
                <Button type='primary' onClick={this.showModal.bind(this)}>添加</Button>
                <Modal
                    width={550}
                    title='添加人员'
                    visible={this.state.visibale}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form>
                        <Row gutter='16'>
                            <Col>
                                <FormItem label='编码' {...formItemLayout}>
                                    <Col><Input disabled/></Col>
                                    <Col offset={1}><Checkbox checked>自动生成</Checkbox></Col>
                                </FormItem>
                                <FormItem label='姓名' {...formItemLayout}>
                                    <Col><Input/></Col>
                                </FormItem>
                                <FormItem label='性别' {...formItemLayout}>
                                    <Col offset={1}>
                                        <Radio>男</Radio>
                                        <Radio>女</Radio>
                                    </Col>
                                </FormItem>
                                <FormItem label='电话' {...formItemLayout}>
                                    <Col><Input/></Col>
                                </FormItem>
                                <FormItem label='学号' {...formItemLayout}>
                                    <Col><Input/></Col>
                                </FormItem>
                                <FormItem label='院系' {...formItemLayout}>
                                    <Col><Input/></Col>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}