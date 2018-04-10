import React from 'react';
import {Route} from 'react-router-dom';
import FrontNews from '../frontComponents/frontNews'
import FrontHeader from '../headers/frontHeader'
import StayOut from '../frontComponents/frontApply'
import ApplyOut from '../frontComponents/frontApply/stayOut'
import AddVisiterInfo from '../frontComponents/frontRegister/registerVis'
import AddRepaire from '../frontComponents/frontRegister/registerRepaire'
import AddBorrow from '../frontComponents/frontRegister/registerBorrow'
import PersonInfo from '../frontComponents/personalInfo'
 import ShowNews from '../frontComponents/showNews'
 import ResetPassword from '../frontComponents/resetpas'
import App from '../app'


export default class FrontRoutes extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <Route path='/backstage/app' component={App}/>
                <Route path='/front/news' component={FrontNews}/>
                <Route path='/front/applytuisu' component={StayOut}/>
                <Route path='/front/applystayout' component={ApplyOut}/>
                <Route path='/front/registervis' component={AddVisiterInfo}/>
                <Route path='/front/registerrepaire' component={AddRepaire}/>
                <Route path='/front/registerborrow' component={AddBorrow}/>
                <Route path='/front/personinfo' component={PersonInfo}/>  
                <Route path='/front/resetpassword' component={ResetPassword}/>   
                <Route path='/front/news/info' component={ShowNews}/>
               
            </div>
        )
    }
}