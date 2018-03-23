import React from 'react';
import { Button, Form, Row, Col, Card, message, Input, Select, Radio } from 'antd';
import { webApi } from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class ApplyStayOut extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            house: '',
            major: '',
            grade: '',
            department: '',
            isStayOutDes: ''
        }
    }

    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            webApi.post('/addApplyStayOut', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue)
                } else {
                    message.error(data.errorMessage)
                }
            })
        })
    }

    resetInfo() {
        this.props.form.setFieldsValue({ ...this.state });
    }

    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const cardStyle = {
            width: '80%',
            marginLeft: 30,
            marginTop: 20
        }
        return (
            <Card style={cardStyle} title={<h1>提交申请</h1>}>
                <Form>
                    <Row>
                        <Col>
                            <FormItem label='退宿或外宿' {...formItemLayout}>
                                {getFieldDecorator('change', {
                                    rules: [{ required: true, message: '申请类型必选' }]
                                })(<RadioGroup>
                                    <Radio value='ts'>退宿</Radio>
                                    <Radio value='ws'>外宿</Radio>
                                </RadioGroup>)}
                            </FormItem>
                        </Col>
                        <Col pull={1}>
                            <FormItem label='姓名' {...formItemLayout}>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '姓名不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='学号' {...formItemLayout}>
                                {getFieldDecorator('studentId', {
                                    rules: [{ required: true, message: '学号不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='宿舍' {...formItemLayout}>
                                {getFieldDecorator('house', {
                                    rules: [{ required: true, message: '宿舍不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='学院' {...formItemLayout}>
                                {getFieldDecorator('department', {
                                    rules: [{ required: true, message: '学院不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='专业' {...formItemLayout}>
                                {getFieldDecorator('major', {
                                    rules: [{ required: true, message: '专业不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='班级' {...formItemLayout}>
                                {getFieldDecorator('grade', {
                                    rules: [{ required: true, message: '班级不能为空' }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='原因' {...formItemLayout}>
                                {getFieldDecorator('isStayOutDes', {
                                    rules: [{ required: true, message: '外宿或退宿原因不能为空' }]
                                })(<TextArea rows='3' />)}
                            </FormItem>
                        </Col>

                        <div style={{ float: 'right' }}>
                            <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                            <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.resetInfo.bind(this)}>重置</Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        )
    }
}
ApplyStayOut = Form.create()(ApplyStayOut)
export default ApplyStayOut