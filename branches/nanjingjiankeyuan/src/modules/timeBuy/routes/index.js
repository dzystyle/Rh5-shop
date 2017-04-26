import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import timeBuy from './timeBuy';

const routesConfig = (<Route path="/" component={App}>
  <Route path='/timeBuy/:activityClass' component={timeBuy} title='限时特卖'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
