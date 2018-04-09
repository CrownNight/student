import React from 'react';
import { Carousel, Card } from 'antd';
import XCarousel from './components/carousel'
import NewsListLeft from './components/newsLeft'
import NewsListRight from './components/newsRight'
//import InfiniteScroll from 'react-infinite-scroller';
import './index.css'

export default class FrontNews extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Card>
                    <XCarousel />
                </Card>
                <Card style={{width:700,marginTop:10,float: 'left',marginLeft:50}}>
                   {/* <InfiniteScroll                 
                   initialLoad={false}
                   pageStart={0}
                   //loadMore={this.handleInfiniteOnLoad}
                   hasMore={true}
                   useWindow={false}
                   >
                   <NewsList />
                   </InfiniteScroll> */}
                   <NewsListLeft />
                </Card>
                <Card style={{width:700,marginTop:10,float: 'right',marginRight:50}}>
                    <NewsListRight />
                </Card>
            </div>
        )
    }
}