import React from 'react';
import { Modal, message, Form, Input, Row, Col, Radio, Button } from 'antd';
import { webApi } from '../../../utils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea

class EditPersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            waisu: this.props.data.isStayOut || '否',
            tuisu: this.props.data.isTuisu || '否'
        }
    }
    showModal() {
        this.props.form.setFieldsValue(this.props.data)
        this.setState({
            show: true
        })
    }

    handleConfirm() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.id=this.props.data.id;
            webApi.post('/updateinfo', value).then(data => {
                if (data.flag) {
                    message.info('修改成功');
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error(data.errorMessage)
                }
            })
            this.setState({
                show: false
            })
        })

    }

    handleCancel() {
        this.setState({
            show: false
        })
    }

    radioChange(e) {
        this.setState({ waisu: e.target.value })
    }
    handleChange(e) {
        this.setState({ tuisu: e.target.value })
    }

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const { tuisu, waisu } = this.state
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                <a type='primary' onClick={this.showModal.bind(this)}>{this.props.data.username}</a>
                <Modal
                    title='编辑个人信息'
                    visible={this.state.show}
                    onOk={this.handleConfirm.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText='确认'
                    cancelText='取消'
                >
                    <Form>
                        <Row gutter='16'>
                            <Col>
                                <FormItem label='姓名' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, max: 10, message: '姓名不能为空且长度不能超过10', }]
                                        })(<Input />)}
                                    </Col>
                                </FormItem>
                                <FormItem label='院系' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('department', {
                                            rules: [{ required: true, max: 20, message: '学院不能为空', }]
                                        })(<Input />)}
                                    </Col>
                                </FormItem>
                                <FormItem label='宿舍' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('house', {
                                            rules: [{ required: true, max: 10, message: '宿舍及房间号不能为空', }]
                                        })(<Input />)}
                                    </Col>
                                </FormItem>
                                <FormItem label='专业' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('major', {
                                            rules: [{ required: true, max: 10, message: '专业不能为空', }]
                                        })(<Input />)}
                                    </Col>
                                </FormItem>
                                <FormItem label='班级' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('grade', {
                                            rules: [{ required: true, max: 10, message: '班级不能为空', }]
                                        })(<Input />)}
                                    </Col>
                                </FormItem>
                                <FormItem label='是否外宿' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('isStayOut', {
                                            rules: [{ required: true }]
                                        })(<RadioGroup onChange={this.radioChange.bind(this)}>
                                            <Radio value='是'>是</Radio>
                                            <Radio value='否'>否</Radio>
                                        </RadioGroup>)}
                                    </Col>
                                </FormItem>
                                {waisu == '是' ? <FormItem label='外宿原因' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('isStayOutDes', {
                                            rules: [{ required: true, max: 50, message: '外宿原因不能超过50字', }]
                                        })(<TextArea rows='3' />)}
                                    </Col>
                                </FormItem> : ''}
                                <FormItem label='是否退宿' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('isTuisu', {
                                            rules: [{ required: true }]
                                        })(<RadioGroup onChange={this.handleChange.bind(this)}>
                                            <Radio value='是'>是</Radio>
                                            <Radio value='否'>否</Radio>
                                        </RadioGroup>)}
                                    </Col>
                                </FormItem>
                                {tuisu == '是' ? <FormItem label='退宿原因' {...formItemLayout}>
                                    <Col>
                                        {getFieldDecorator('isTuisuDes', {
                                            rules: [{ required: true, max: 50, message: '退宿原因不能超过50字', }]
                                        })(<TextArea rows='3' />)}
                                    </Col>
                                </FormItem> : ''}
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
EditPersonalInfo = Form.create()(EditPersonalInfo)
export default EditPersonalInfo