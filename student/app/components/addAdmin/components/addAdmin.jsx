import React from 'react';
import { Input, Modal, Button, Form, Row, Col, Radio, Checkbox, message } from 'antd';
import { webApi } from '../../../utils';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AddAdmin extends React.Component {
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
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.type='是'
            webApi.post('/addUser', value).then(data => {
                if (data.flag) {
                    message.success(data.returnValue)
                    if(this.props.callBack){
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error('添加失败')
                }
                this.setState({
                    visibale: false
                })
            })
        })
    }

    handleCancel(){
        this.setState({visibale:false})
    }

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
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
                    okText='确认'
                    cancelText='取消'
                >
                    <Form>
                        <Row gutter='16'>
                            <Col>
                                <FormItem label='姓名' {...formItemLayout}>
                                    <Col>{getFieldDecorator('userName', {
                                        rules: [{ required: true, max: 9, message: '姓名不能为空且长度不能超过10个字符' }]
                                    })(<Input maxlength='10' />)}</Col>
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
                                <FormItem label='电话' {...formItemLayout}>
                                    <Col>{getFieldDecorator('phone', {
                                        rules: [{ required: true, max: 11, message: '电话号码不能为空且不能超过11位' }]
                                    })(<Input maxlength='11' />)}</Col>
                                </FormItem>
                                <FormItem label='身份证' {...formItemLayout}>
                                    <Col>{getFieldDecorator('idCard', {
                                        rules: [{ required: true,  message: '身份证不能为空' }]
                                    })(<Input  />)}</Col>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

AddAdmin = Form.create()(AddAdmin);
export default AddAdmin