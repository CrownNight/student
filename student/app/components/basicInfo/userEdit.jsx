import React from 'react';
import {Form,Input,Modal,Row,Col,message,Radio} from 'antd';

const FormItem = Form.Item;

export default class UserEdit extends React.Component{
    constructor() {
        super()
        this.state={
            show:false
        }
    }
    showModal() {
        this.setState({
            show:true
        })
    }
    handleOk(){
        this.setState({
            show:false
        })
    }
    handleCancel() {
        this.setState({show:false})
    }

    render(){
        const {userName}=this.props.data
        const formItemLayout={
            labelCol:{span:4},
            wrapperCol:{span:20}
        }
        return(
            <div>
                <a type='primary'  onClick={this.showModal.bind(this)}>{userName}</a>
                <Modal
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.show}
                    title='修改个人信息' >
                    <Form>
                        <Row gutter={16}>
                            <Col>
                                <FormItem label='编码' {...formItemLayout}>
                                    <Input disabled/>
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