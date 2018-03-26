import React from 'react';
import { Button, Form, message, Row, Col, Input, Modal, Radio, Card, Popconfirm, DatePicker } from 'antd';
import moment from 'moment'
import { webApi } from '../../../utils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class EditRepaire extends React.Component {
    constructor() {
        super()
        this.state = { show: false }
    }

    showModal() {
        this.props.data.startTime = moment(this.props.data.startTime, 'YYYY-MM-DD')
        this.props.data.endTime = this.props.data.endTime == '' ? '' : moment(this.props.data.endTime, 'YYYY-MM-DD')
        this.props.form.setFieldsValue(this.props.data)
        this.setState({
            show: true
        })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.id = this.props.data.id;
            value.status = '未解决'
            webApi.post('/updateRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue);
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error('修改失败，请重试...')
                }
            })
        })
        this.setState({ show: false })
    }
    handleCancel() {
        this.setState({ show: false })
    }
    //点击了删除
    handleDel() {
        let condition = {};
        condition.id = this.props.data.id;
        webApi.post('/deleteRegisterInfo', condition).then(data => {
            if (data.flag) {
                message.info(data.returnValue);
                if (this.props.callBack) {
                    this.props.callBack(data.flag)
                }
            } else {
                message.error('删除失败，请重试...')
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
                <Button type='primary' size='small' disabled={this.props.data.status == '已解决' ? true : false} onClick={this.showModal.bind(this)}>编辑</Button>
                <Popconfirm title='确认删除？' onConfirm={this.handleDel.bind(this)} okText='确定' cancelText='取消'>
                    <Button type='danger' size='small' style={{ marginLeft: 10 }}>删除</Button>
                </Popconfirm>
                <Modal visible={this.state.show} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} width={600} title='编辑维修信息' >
                    <Form>
                        <Row gutter='16'>
                            <Col>
                                <FormItem label='报修人' {...formItemLayout}>
                                    {getFieldDecorator('studentName', {
                                        rules: [{ required: true, message: '报修姓名不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修时间' {...formItemLayout}>
                                    {getFieldDecorator('startTime', {
                                        rules: [{ required: true, message: '报修时间不能为空' }]
                                    })(<DatePicker placeholder='请选择日期' />)}
                                </FormItem>
                            </Col>
                            {/* <Col>
                                <FormItem label='解决时间' {...formItemLayout}>
                                    {getFieldDecorator('endTime', {
                                        rules: [{ required: true, message: '解决时间不能为空' }]
                                    })(<DatePicker placeholder='请选择日期' />)}
                                </FormItem>
                            </Col> */}
                            <Col>
                                <FormItem label='报修宿舍' {...formItemLayout}>
                                    {getFieldDecorator('repaireHouse', {
                                        rules: [{ required: true, message: '报修宿舍不能为空' }]
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修描述' {...formItemLayout}>
                                    {getFieldDecorator('des', {
                                        rules: [{ required: true, message: '报修描述不能为空' }]
                                    })(<Input.TextArea rows='3' />)}
                                </FormItem>
                            </Col>
                            {/* <Col>
                                <FormItem label='报修状态' {...formItemLayout}>
                                    {getFieldDecorator('status', {
                                        rules: [{ required: true }]
                                    })(<RadioGroup>
                                        <Radio value='已解决'>已解决</Radio>
                                        <Radio value='未解决'>未解决</Radio>
                                    </RadioGroup>)}

                                </FormItem>
                            </Col> */}
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
EditRepaire = Form.create()(EditRepaire);
export default EditRepaire