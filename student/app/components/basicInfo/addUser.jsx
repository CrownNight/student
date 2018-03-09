import React from 'react';
import {Button,Popconfirm} from 'antd';
import AddModal from './addModal'

export default class AddUser extends React.Component{
    constructor() {
        super()
    }
    handleConfirm() {

    }
    render() {
        return(
            <div>
               <div style={{display:'inline-block'}}> <AddModal/></div>
                <div style={{float:'right'}}>
                    <Popconfirm onConfirm={this.handleConfirm.bind(this)}>
                        <Button type='ghost' style={{color:'red',marginLeft:10}}>删除</Button>
                    </Popconfirm>
                </div>
            </div>
        )
    }
}