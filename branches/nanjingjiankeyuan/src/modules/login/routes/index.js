import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import login from './login';
import reg from './reg';
import forgetPassword from './forgetPassword';


const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={login} title='登录'/>
  <Route path="reg" component={reg} title='手机快速注册'/>
  <Route path="forgetPassword" component={forgetPassword} title='获取验证码'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
