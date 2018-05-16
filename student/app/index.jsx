import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import FrontHeader from './headers/frontHeader'
import Login from './login/login'
import Register from './login/register'
import App from './app'
import './index.css'
import 'antd/dist/antd.css';

const history = createHistory()
const temp = localStorage.getItem('temp')
let t = JSON.parse(temp)
if (t && t.id != null) {
     history.push('/front/news')
} else {
    history.push('/login')
}
ReactDOM.render(
    <Router history={history}>
        <div>
            <Route path='/login' component={Login} />
            <Route path='/backstage/basicinfo' component={App}  history={history}/>
            <Route path='/front/news' component={FrontHeader}  history={history}/>
            <Route path='/register' component={Register} history={history}/>
        </div>
    </Router>,
    document.getElementById('app')
)