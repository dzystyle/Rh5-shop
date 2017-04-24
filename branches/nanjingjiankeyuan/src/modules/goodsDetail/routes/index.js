import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import goodsDetail from './goodsDetail';
import evaluteList from './evaluteList';
import consultList from './consultList';
import consultEdit from './consultEdit';

const routesConfig = (<Route path="/" component={App}>
  <Route path='/:specId' component={goodsDetail} title='商品详情'/>
  <Route path='evaluteList/:goodsId' component={evaluteList} title='评价' />
  <Route path='consultList/:goodsId' component={consultList} title='购买咨询'/>
  <Route path='consultEdit/:goodsId' component={consultEdit} title='购买咨询'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
