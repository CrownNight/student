import React from 'react';
import {Route} from 'react-router-dom';
import BasicInfo from "../components/basicInfo/index";
import HouseInfo from '../components/houseInfo';


export default class Routes extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Route path='/basicInfo' component={BasicInfo}/>
                <Route path='/houseInfo' component={HouseInfo}/>
            </div>
        )
    }
}