import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)