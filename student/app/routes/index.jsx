import React from 'react';
import {Route} from 'react-router-dom';
import userEcharts from "../components/basicInfo/index";
import BasicInfo from '../components/basicInfo/table'
import HouseInfo from '../components/houseInfo';
import Visreg from '../components/visreg';
import Accommodation from '../components/studentStay/table';
import ApplyStayOut from '../components/applyStayOut';
import ApplyOut from '../components/applyOut';
import Repaire from '../components/repaireInfo';
import Borrow from '../components/borrowInfo';
import Discipline from '../components/discipline';
import Login from '../login/login'
import HouseEcharts from '../components/studentStay'
import FrontHeader from '../headers/frontHeader'
import AddNews from '../components/addNews'
import AddAdmin from '../components/addAdmin';

export default class Routes extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                {/* <Route path='/front/news' component={FrontHeader}/> */}
                <Route path='/backstage/basicInfo' component={userEcharts}/>
                <Route path='/backstage/basicInfo/list' component={BasicInfo}/>
                <Route path='/backstage/houseInfo' component={HouseInfo}/>
                <Route path='/backstage/visreg' component={Visreg}/>
                <Route path='/backstage/studentStay' component={HouseEcharts}/>
                <Route path='/backstage/studentStay/list' component={Accommodation}/>                
                <Route path='/backstage/applyStayOut' component={ApplyStayOut}/>
                <Route path='/backstage/applyOut' component={ApplyOut}/>
                <Route path='/backstage/repaire' component={Repaire}/>
                <Route path='/backstage/borrow' component={Borrow}/>
                <Route path='/backstage/discipline' component={Discipline}/>
                <Route path='/backstage/addAdmin' component={AddAdmin}/>
                <Route path='/backstage/addnews' component={AddNews}/>
            </div>
        )
    }
}