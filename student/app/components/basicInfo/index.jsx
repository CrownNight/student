import React from 'react';
import {Card, Col} from 'antd';

export default class BasicInfo extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Col span={20} push={1} style={{marginTop:10}}>
                <Card hoverable={true} title={<h2>个人信息</h2>}>
                    <div style={{textAlign: 'left'}}>
                        <div>
                            <label style={{fontSize: 18}}>姓名:</label>
                            <span style={{fontSize: 18}}>123</span>
                        </div>
                        <div style={{marginTop: 20}}>
                            <label style={{fontSize: 18}}>姓名:</label>
                            <span style={{fontSize: 18}}>123</span>
                        </div>
                        <div style={{marginTop: 20}}>
                            <label style={{fontSize: 18}}>姓名:</label>
                            <span style={{fontSize: 18}}>123</span>
                        </div>
                        <div style={{marginTop: 20}}>
                            <label style={{fontSize: 18}}>姓名:</label>
                            <span style={{fontSize: 18}}>123</span>
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }
}