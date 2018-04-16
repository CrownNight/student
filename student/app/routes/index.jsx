import React from 'react';
import {Route} from 'react-router-dom';
import userEcharts from "../components/basicInfo/index";
import BasicInfo from '../components/basicInfo/table'
import BuildingEcharts from '../components/houseInfo'
import BuildingInfo from '../components/houseInfo/table';
import visEcharts from '../components/visreg';
import Visreg from '../components/visreg/table'
import Accommodation from '../components/studentStay/table';
import ApplyStayOut from '../components/applyStayOut';
import ApplyOut from '../components/applyOut';
import RepaireEcharts from '../components/repaireInfo';
import Repaire from '../components/repaireInfo/table'
import BorrowEcharts from '../components/borrowInfo';
import Borrow from '../components/borrowInfo/table';
import DisciplineEcharts from '../components/discipline'
import Discipline from '../components/discipline/table';
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

                <Route path='/backstage/houseInfo' component={BuildingEcharts}/>
                <Route path='/backstage/houseInfo/list' component={BuildingInfo}/>

                <Route path='/backstage/visreg' component={visEcharts}/>
                <Route path='/backstage/visreg/list' component={Visreg}/>                
               
                <Route path='/backstage/studentStay' component={HouseEcharts}/>
                <Route path='/backstage/studentStay/list' component={Accommodation}/>                
                <Route path='/backstage/applyStayOut' component={ApplyStayOut}/>
                <Route path='/backstage/applyOut' component={ApplyOut}/>
                
                <Route path='/backstage/repaire' component={RepaireEcharts}/>
                <Route path='/backstage/repaire/list' component={Repaire}/>
                
                <Route path='/backstage/borrow' component={BorrowEcharts}/>
                <Route path='/backstage/borrow/list' component={Borrow}/>

                <Route path='/backstage/discipline' component={DisciplineEcharts}/>
                <Route path='/backstage/discipline/list' component={Discipline}/>

                <Route path='/backstage/addAdmin' component={AddAdmin}/>
                <Route path='/backstage/addnews' component={AddNews}/>
            </div>
        )
    }
}