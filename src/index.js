import React from 'react';
import ReactDOM from 'react-dom';
import 'react-router';
import './index.css';
import AdminLogin from './component/login/AdminLogin';
import AdminIndex from './component/index/AdminIndex';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route,Switch} from 'react-router-dom';
// import { Provider } from 'react-redux';
ReactDOM.render(
    <Router>
        <Switch> 
            <Route exact path="/" component={AdminLogin}/>
            <Route path="/index" component={AdminIndex}/>
        </Switch>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
