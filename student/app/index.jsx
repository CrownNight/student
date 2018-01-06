import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddContent from './demoApp/addContent';
import ContentWrap from './demoApp/content'
import {Router,Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

ReactDOM.render(
    <Router history={history}>
        <div>
            <Route path='/' component={App}/>
            <Route path='/content' component={ContentWrap}/>
            <Route path='/addContent' component={AddContent}/>
        </div>
    </Router>,
    document.getElementById('root')
)