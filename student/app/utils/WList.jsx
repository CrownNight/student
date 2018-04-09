import React from 'react';
import { List, Pagination } from 'antd';

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
        const { data, columns, total, size, index , renderItem} = this.props;
        return (
            <div>
                <List
                    {...this.props}
                    dataSource={data}
                    pagination={false}
                    renderItem={renderItem}
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
            </div>
        )
    }
}