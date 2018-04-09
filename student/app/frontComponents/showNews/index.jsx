import React from 'react';
import {Card} from 'antd';

export default class ShowNews extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        const item = this.props.location.state; 
        return(
            <Card title={<h2>{item.adTitle!=''? item.adTitle:item.newsTitle}</h2>} style={{position:'absolute',top:60,width:'100%',height:'100%'}}>
            <div>
                {item.ad!=''?item.ad:item.news}
            </div>
            </Card>
        )
    }
}