import React from 'react';
import {Tabs,Button,Card,Icon,Input,Table,Form,Checkbox,Radio} from 'antd';
import './index.css'

const FormItem = Form.Item;

export default class Visreg extends React.Component{
    constructor() {
        super()
    }
    componentDidMount() {

    }

    render() {
        return(
            <div>
                <Card noHovering title={<h1>来访登记</h1>}>
                    <div className='formWidth'>
                        <Form>
                           <div className='formBoxSmall'>
                               <FormItem
                               label='名称'
                               labelCol={{span:4}}
                               wrapperCol={{span:18}}
                               >
                                   <Input/>
                               </FormItem>
                               <FormItem
                                   label='身份证'
                                   labelCol={{span:4}}
                                   wrapperCol={{span:18}}
                               >
                                   <Input/>
                               </FormItem>
                               <FormItem
                                   label='子女所属院系'
                                   labelCol={{span:4}}
                                   wrapperCol={{span:18}}
                               >
                                   <Input/>
                               </FormItem>
                               <FormItem wrapperCol={{span:20,offset:16}}>
                                   <Button type='primary' size='default'>保存</Button>
                                   <Button type='ghost' size='default' style={{marginLeft:20}}>重置</Button>
                               </FormItem>
                           </div>
                        </Form>
                    </div>
                </Card>
            </div>
        )
    }
}