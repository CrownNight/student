import React from 'react';
import { Radio, Input, Modal, message, Form, Row, Col } from 'antd';
import { webApi } from '../../../utils';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

export default class Examine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isPass: false || this.props.data.isPass == '已通过' ? true : false,
            isPassDes: ''

        }
    }
    showModal() {
        this.setState({
            show: true
        })
    }

    handleOk() {
        let searchCondition = { ...this.props.data };
        searchCondition.isPass = this.state.isPass;
        searchCondition.isPassDes = this.state.isPassDes;
        webApi.post('/updateInfo', searchCondition).then(data => {
            if (data.flag) {
                message.info('审核成功');
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
    }
    handleCancel() {
        this.setState({
            show: false
        })
    }
    radioChange(e) {
        this.setState({
            isPass: e.target.value
        })
    }

    valueChange(e) {
        this.setState({
            isPassDes: e.target.value
        })
    }
    changeStatue() {
        let sta = {}
        if (this.props.data.isPass == '1') {
            sta = <span>已通过</span>
        } else if (this.props.data.isPass == '2') {
            sta = <span style={{ color: 'red' }}>未通过</span>
        } else {
            sta = <a onClick={this.showModal.bind(this)}>待审核</a>
        }
        return sta
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <div>
                {this.changeStatue()}
                <Modal
                    title='审核'
                    visible={this.state.show}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText='确认'
                    cancelText='取消'
                >
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='审核状态' {...formItemLayout}>
                                    <RadioGroup onChange={this.radioChange.bind(this)} value={this.state.isPass}>
                                        <Radio value='1'>通过</Radio>
                                        <Radio value='2'>未通过</Radio>
                                    </RadioGroup>
                                </FormItem>
                                {this.state.isPass == '2' ?
                                    <FormItem label='未通过原因' {...formItemLayout}>
                                        <TextArea rows='3' onChange={this.valueChange.bind(this)} value={this.state.isPassDes} />
                                    </FormItem>
                                    : ''}
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}