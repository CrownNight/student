import React from 'react';
import { Button, message, Form, Input, Modal, Card, Row, Col } from 'antd';

const FormItem = Form.Item;

export default class AddHouse extends React.Component {
    constructor() {
        super()
        this.state={
            show:false
        }
    }

    showModal(){
        this.setState({
            show:true
        })
    }

    handleOk(){
        this.setState({show:false})
    }

    handleCancel(){
        this.setState({show:false})
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' size='middle' onClick={this.showModal.bind(this)}>添加宿舍</Button>                
                   <Modal title='添加宿舍' visible={this.state.show} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                   <Form>
                        <Row>
                            <Col>
                                <FormItem label='宿舍号' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='所属楼栋' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='床位' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='桌椅' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='饮水机' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                   </Modal>
            </div>
        )
    }
}