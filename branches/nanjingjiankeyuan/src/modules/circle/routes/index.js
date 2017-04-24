import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import circle from './circle';
import circleList from './circleList';
import circleDetail from './circleDetail';
import circleCreate from './circleCreate';
import postingsCreate from './postingsCreate';
import circleSearch from './circleSearch';
import postingsList from './postingsList';
import postingsSearch from './postingsSearch';
import postings from './postings';
import comments from './comments';
import replys from './replys';
import my from './my';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={circle} title='圈子' />
  <Route path='/circleList' component={circleList} showTitle={false} />
  <Route path='/circleDetail/(:circleId)' component={circleDetail} title='圈子详情'/>
  <Route path='/circleCreate' component={circleCreate} title='圈子创建' />
  <Route path='/circleSearch/:keyword' component={circleSearch} title='搜索结果' />
  <Route path='/postingsList' component={postingsList} showTitle={false} />
  <Route path='/postingsCreate' component={postingsCreate} title='发布帖子' />
  <Route path='/postings/:postingsId' component={postings} title='帖子详情' />
  <Route path='/postingsSearch/:keyword' component={postingsSearch} title='搜索结果' />
  <Route path='/comments/:postingsId' component={comments} title='评论列表' />
  <Route path='/replys/:commentId' component={replys} title='回复列表' />
  <Route path='/my' component={my} showTitle={true} />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
