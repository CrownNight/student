import React from 'react';
import {message,List} from 'antd';
import {webApi,WList} from '../../../utils';
import {Link} from 'react-router-dom';


export default class NewsListLeft extends React.Component{
    constructor(){
        super()
        this.state={
            data:[],
            index:1,
            size:5,
            total:1
        }
    }
    componentDidMount(){
        this.getNewsList(this.state.index,this.state.size)
    }
    getNewsList(index,size){
        webApi.get('/getNewsList?index='+index+'&size='+size+'&type=ad').then(data=>{
            if(data.flag){
                this.setState({data:data.returnValue,total:data.total})
            }else{
                message.error(data.returnValue)
            }
        })
    }
    changeSize(index,size){
        this.setState({index,size})
        this.getNewsList(index,size)
    }
    render(){
        const {data,index,size,total} = this.state
        return(
            <div>
                <WList 
                header='公告信息'
                data={data}
                index={index}
                size={size}
                total={total}
                onChange={this.changeSize.bind(this)}
                renderItem={item => (<List.Item><Link to={{pathname:'/front/news/info',state:item}}>{item.adTitle}</Link></List.Item>)}
                />
            </div>
        )
    }
}