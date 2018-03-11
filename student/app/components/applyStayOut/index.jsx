import React from 'react';
import { Button, Form, Row, Col, Card, message, Input ,Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

export default class ApplyStayOut extends React.Component {
    constructor() {
        super()
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const cardStyle={
            width:'80%',
            marginLeft:30,
            marginTop:20
        }
        return (
            <Card  style={cardStyle} title={<h1>外宿申请</h1>}>
                <Form>
                    <Row>
                        <Col pull={1}>
                            <FormItem label='姓名' {...formItemLayout}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='学院' {...formItemLayout}>
                                <Select showSearch={true} mode='multiple'>
                                    <Option key='1'>信息科学与工程学院</Option>
                                    <Option key='2'>土木工程学院</Option>
                                    <Option key='3'>美术与动漫学院</Option>
                                    <Option key='4'>外国语学院</Option>
                                    <Option key='5'>张澜学院</Option>
                                    {children}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='专业' {...formItemLayout}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='班级' {...formItemLayout}>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label='外宿原因' {...formItemLayout}>
                                <Input type='textarea' rows='10' />
                            </FormItem>
                        </Col>                        
                    </Row>
                    <div style={{float:'right'}}>
                    <Button type='primary'>提交</Button>
                    <Button type='ghost'  style={{marginLeft:10,color:'red'}}>取消</Button>
                    </div>
                </Form>
            </Card>
        )
    }
}