import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShoppingIndex from './component/index/ShoppingIndex';
import UserLogin from './component/login/UserLogin';
import UserRegister from './component/register/UserRegister';
import ProductDetail from './component/productInfo/ProductDetail';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
ReactDOM.render(<Router>
    <Switch>
        <Route exact path="/" component={ShoppingIndex} />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegister} />
        <Route path="/detail" component={ProductDetail} />
    </Switch>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
