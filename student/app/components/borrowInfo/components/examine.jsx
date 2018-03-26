import React from 'react';
import { Modal, message, Form, Radio, Row, Col, DatePicker } from 'antd';
import { webApi } from '../../../utils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group

class Examine extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            status: '为归还'
        }
    }
    showModal() {
        this.setState({ show: true })
    }
    handleOk() {
        this.props.form.validateFields((err, value) => {
            if (err) return;  
            

            value.id = this.props.data.id;
            value.status = this.state.status;
            value.endTime=value.endTime ? value.endTime:''
            webApi.post('/examineRegisterInfo', value).then(data => {
                if (data.flag) {
                    message.info(data.returnValue);
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
    handleCancel() {
        this.setState({ show: false })
    }
    radioChange(e) {
        this.setState({
            status: e.target.value
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
                {this.props.data.status != '已归还' ? <a onClick={this.showModal.bind(this)}>未归还</a> : <span>已归还</span>}
                <Modal
                    title='审核状态'
                    okText='确认'
                    cancelText='取消'
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    visible={this.state.show}
                >
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='解决状态' {...formItemLayout}>
                                    <RadioGroup onChange={this.radioChange.bind(this)}>
                                        <Radio value='已归还'>已归还</Radio>
                                        <Radio value='未归还'>未归还</Radio>
                                    </RadioGroup>                            
                                </FormItem>
                            </Col>
                            {this.state.status == '已归还' ? <Col>
                                <FormItem label='解决时间' {...formItemLayout}>
                                    {getFieldDecorator('endTime', {
                                        rules: [{ required: true }]
                                    })(
                                        <DatePicker placeholder='请选择解决日期' />
                                    )}
                                </FormItem>
                            </Col> : ''}
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
Examine = Form.create()(Examine)
export default Examine