import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import cart from './cart';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={cart}
    selectedTab='cart'
    showBottomBar={true} title='购物车' showTitle={true} />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
