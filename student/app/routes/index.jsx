import React from 'react';
import {Route} from 'react-router-dom';
import BasicInfo from "../components/basicInfo/index";
import HouseInfo from '../components/houseInfo';
import Visreg from '../components/visreg';
import Accommodation from '../components/studentStay';
import ApplyStayOut from '../components/applyStayOut';
import ApplyOut from '../components/applyOut';
import AddRepir from '../components/addRepir'
import Login from '../login/login'


export default class Routes extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Route path='/basicInfo' component={BasicInfo}/>
                <Route path='/houseInfo' component={HouseInfo}/>
                <Route path='/visreg' component={Visreg}/>
                <Route path='/studentStay' component={Accommodation}/>
                <Route path='/applyStayOut' component={ApplyStayOut}/>
                <Route path='/applyOut' component={ApplyOut}/>
                <Route path='/addRepir' component={AddRepir}/>
                <Route path='/login' component={Login}/>
            </div>
        )
    }
}