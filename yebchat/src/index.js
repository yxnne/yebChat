import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import reducers from './reducers';
import './config';
//页面组件引入
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './container/auth/authRoute';


// redux调试工具
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():f=>f;
const store = createStore(reducers, compose(applyMiddleware(thunk), reduxDevTool));

ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </div>
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root'));