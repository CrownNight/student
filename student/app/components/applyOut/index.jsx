import React from 'react';
import {Form,Input,Button,Card,message,Row,Col} from 'antd';

const FormItem=Form.Item;

export default class ApplyOut extends React.Component{
    constructor(){
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
        return(
            <Card  style={cardStyle} title={<h1>退宿申请</h1>}>
            <Form>
                <Row>
                    <Col pull={1}>
                        <FormItem label='姓名' {...formItemLayout}>
                            <Input />
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label='学院' {...formItemLayout}>
                            <Input />
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
                        <FormItem label='退宿原因' {...formItemLayout}>
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