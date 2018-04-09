import React from 'react';
import { Button, Form, Input, message, Row, Col, Modal, DatePicker ,Card} from 'antd';
import moment from 'moment'
import { webApi } from '../../utils';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AddRepaire extends React.Component {
    constructor() {
        super();
        this.state = {
            studentName: '',
            startTime: '',
            repaireHouse: '',
            des: '',
        }
    }

    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) return;

            value.status = '未解决'
            value.type = 'repair'
            value.startTime = moment(value.startTime, 'YYYY-MM-DD')
            webApi.post('/addRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue)
                    if (this.props.callBack) {
                        this.props.callBack(data.flag)
                    }
                } else {
                    message.error(data.returnValue)
                }
            })
        })
        this.setState({ show: false })
    }

    resetInfo() {
        this.props.form.setFieldsValue(this.state)
    }
    render() {
        const { getFieldDecorator, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const cardStyle = {
            width: '60%',
            marginLeft: '20%',
            marginTop: '4%'
        }
        return (
            <Card title={<h1>维修信息登记</h1>} style={cardStyle}>
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
                    <div style={{ float: 'right' }}>
                        <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                        <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.resetInfo.bind(this)}>重置</Button>
                    </div>
                </Form>
            </Card>
        )
    }
}
AddRepaire = Form.create()(AddRepaire);
export default AddRepaire