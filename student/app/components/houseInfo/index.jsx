import React from 'react';
import {Card,Col} from 'antd';

export default class HouseInfo extends React.Component{
    constructor() {
        super()
    }
    render() {
        return(
            <Col span={20} push={1} style={{marginTop:10}}>
                <Card title={<h2>宿舍信息</h2>}>
                    <div style={{fontSize:18}}>
                        <div>所属楼栋：<span>10</span></div>
                        <div>所属宿舍：<span>227</span></div>
                    </div>
                </Card>
            </Col>
        )
    }
}