import React from 'react';
import { Carousel } from 'antd'
import '../index.css'

export default class XCarousel extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Carousel autoplay className='carousel' >
               <div style={{height:400}}><img src={require('../../../../image/1.jpg') } width='100%'  height='100%'/></div>
               <div style={{height:400}}><img src={require('../../../../image/2.jpg')}  width='100%' height='100%'/></div>
              <div style={{height:400}}><img src={require('../../../../image/3.jpg')}  width='100%' height='100%'/></div>
            </Carousel>
        )
    }
}