import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import content from './content';
import contentDetail from './contentDetail';
import comments from './comments';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={content} title='资讯'/>
  <Route path='/contentDetail/:id' component={contentDetail} title='新闻详情'/>
  <Route path='/comments/:id' component={comments} title='评论详情'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
