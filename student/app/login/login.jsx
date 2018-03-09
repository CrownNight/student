import React from 'react';
import {Icon, Button, Input, Form, Card, Checkbox, Row, Col} from 'antd';

const FormItem = Form.Item;

const addonBeforeUse = (
    <Icon type='user' title='用户名'/>
)
const addonBeforeLock = (
    <Icon type='unlock' title='密码'/>
)

export default class Login extends React.Component {
    constructor() {
        super()
    }
    handleSubmit(){

    }
    render() {
        return (
            <Card title={<h1>用户登录</h1>}>
                <Form>
                    <FormItem>
                        <Input addonBefore={addonBeforeUse} placeholder='请输入用户名'/>
                    </FormItem>
                    <FormItem>
                        <Input addonBefore={addonBeforeLock} type='password' placeholder='请输入密码'/>
                    </FormItem>
                    <Button type='primary' onClick={this.handleSubmit.bind(this)}>登录</Button>
                </Form>
            </Card>
        )
    }
}
