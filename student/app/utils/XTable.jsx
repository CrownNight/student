import React from 'react';
import { Table, Pagination } from 'antd';

export default class XTable extends React.Component {
    constructor() {
        super()
    }

    handleChange(index, size) {
        if(this.props.onChange){
            this.props.onChange(index,size)
        }
    }




    render() {
        const { data, columns, total, size, index } = this.props;
        return (
            <div>
                <Table
                    {...this.props}
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                />
                <div style={{ marginTop: 10, float: 'right' }}>
                    <Pagination
                        {...this.props}
                        total={total}
                        current={index}
                        pageSize={size}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                <div style={{ float: 'right', marginTop: 10, marginRight: 10 }}><span style={{ fontSize: 22 }}>共{total}条</span></div>
            </div>
        )
    }
}