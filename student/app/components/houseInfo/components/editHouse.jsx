import React from 'react';
import {Button,Input,Popconfirm} from 'antd';

export default class EditHouse extends React.Component{
    constructor(){
        super()
    }

    //删除时点击了确定
    handleConfirm(){

    }
    render(){
        return(
            <div>
                <Button type='primary' style={{marginRight:5}}>编辑</Button>
                <Popconfirm title='确认删除吗?' onConfrim={this.handleConfirm.bind(this)}>
                    <Button type='danger'>删除</Button>
                </Popconfirm>
            </div>
        )
    }
}