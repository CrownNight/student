import React from 'react';
import { Button, Input, Popconfirm, Modal, message, Form, Row, Col } from 'antd';
import { webApi } from '../../../utils';

const FormItem = Form.Item;

class EditHouse extends React.Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    showModal() {
        this.props.form.setFieldsValue(this.props.data)
        this.setState({
            show: true
        })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            if (value.haspeople > value.bed) {
                message.error('已住人数不能大于床位数');
                return
            }

            let searchCondition = { ...value };
            searchCondition.id = this.props.data.id;
            webApi.post('/updateHouse', searchCondition).then(data => {
                if (data.flag) {
                    message.info(data.returnValue)
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }                 
                } else {
                    message.error('修改失败，请重试。。。')
                }
            })
        })
        this.setState({
            show: false
        })
    }
    handleCancel() {
        this.setState({ show: false })
    }
    //删除时点击了确定
    handleConfirm() {
        let searchCondition = {};
        searchCondition.id = this.props.data.id
        webApi.post('/deleteHouse', searchCondition).then(data => {
            if (data.flag) {
                message.info(data.returnValue)
                if (this.props.callBack) {
                    this.props.callBack(data.flag)
                }
            } else {
                message.error('删除失败，请重试。。。')
            }
        })
    }
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <Button type='primary' style={{ marginRight: 5 }} size='small' onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm title='确认删除吗?' onConfirm={this.handleConfirm.bind(this)} okText='确认' cancelText='取消'>
                    <Button type='danger' size='small'>删除</Button>
                </Popconfirm>
                <Modal
                    title='编辑宿舍信息'
                    visible={this.state.show}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText='确认'
                    cancelText='取消'
                >
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
                                        rules: [{ required: true, message: '所属楼栋不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='床位' {...formItemLayout}>
                                    {getFieldDecorator('bed', {
                                        rules: [{ required: true, message: '床位不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='桌椅' {...formItemLayout}>
                                    {getFieldDecorator('tables', {
                                        rules: [{ required: true, message: '桌椅不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='饮水机' {...formItemLayout}>
                                    {getFieldDecorator('dispenser', {
                                        rules: [{ required: true, message: '饮水机不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            {/* <Col>
                                <FormItem label='空余' {...formItemLayout}>
                                    {getFieldDecorator('empty', {
                                        rules: [{ required: true }]
                                    })(<Input />)}
                                </FormItem>
                            </Col> */}
                            <Col>
                                <FormItem label='已住人数' {...formItemLayout}>
                                    {getFieldDecorator('haspeople', {
                                        rules: [{ required: true }]
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
EditHouse = Form.create()(EditHouse);
export default EditHouse