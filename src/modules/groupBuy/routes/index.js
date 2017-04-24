import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import groupBuy from './groupBuy';

const routesConfig = (<Route path="/" component={App}>
  <Route path='/groupBuy/:activityClass' component={groupBuy} title='团购'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
