import React from 'react';
import { Form, Card, Input, message, Row, Col, Radio,  Button } from 'antd';
import { webApi } from '../../utils'

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class AddNews extends React.Component {
    constructor() {
        super();
        this.state = {
            type:'',
            title:'',
            content:''
        }
    }

    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err) return;

            webApi.post('/addNewsList',value).then(data=>{
                if(data.flag){
                    message.info(data.returnValue)
                }else{
                    message.error(data.returnValue)
                }
            })
        })
    }
    handleReset(){
        this.props.form.setFieldsValue(this.state)
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
            marginTop: 5
        }
        return (
            <Card title={<h2>添加公告信息</h2>} style={cardStyle}>
                <Form>
                    <Row>
                        <Col>
                            <FormItem label='类别'>
                                {getFieldDecorator('type', {
                                    rules: [{ required: true }]
                                })(<RadioGroup>
                                    <Radio value='ad'>公告</Radio>
                                    <Radio value='new'>新闻</Radio>
                                </RadioGroup>)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='标题'>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true }]
                                })(<Input />)}
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='内容'>
                                {getFieldDecorator('content', {
                                    rules: [{ required: true }]
                                })(<TextArea rows='10' />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ float: 'right' }}>
                        <Button type='primary' onClick={this.handleSubmit.bind(this)}>提交</Button>
                        <Button type='ghost' style={{ marginLeft: 10, color: 'red' }} onClick={this.handleReset.bind(this)}>重置</Button>
                    </div>
                </Form>
            </Card>
        )
    }
}
AddNews = Form.create()(AddNews);
export default AddNews