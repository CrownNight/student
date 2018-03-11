import React from 'react';
import { Form, Button, Input, Row, Col, Card } from 'antd';

const FormItem = Form.Item;

export default class AddRepir extends React.Component {
    constructor() {
        super()
    }

    render() {
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
            <div>
                <Card title={<h1>添加报修</h1>} style={cardStyle}>
                    <Form>
                        <Row>
                            <Col>
                                <FormItem label='报修人姓名' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='院系及班级' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='报修宿舍' {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Col>
                            <Col>
                                <FormItem label='描述' {...formItemLayout}>
                                    <Input type='textarea' rows='10' placeholder='请描述报修详细信息' />
                                </FormItem>
                            </Col>
                        </Row>
                        <div style={{float:'right'}}>
                            <Button type='primary'>确定</Button>
                            <Button type='danger' style={{marginLeft:5}}>取消</Button>
                        </div>
                    </Form>
                </Card>
            </div>
        )
    }
}