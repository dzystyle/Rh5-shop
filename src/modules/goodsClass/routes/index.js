import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import goodsClass from './goodsClass';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={goodsClass} showBottomBar={true} title='分类' showTitle={true} selectedTab='goodsClass'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
