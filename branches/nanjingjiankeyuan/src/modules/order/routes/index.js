import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import order from './order';
import coupon from './coupon';
import invoice from './invoice';
import address from './address';
import addressAdd from './addressAdd';
import addressEdit from './addressEdit';
import cashier from './cashier';
import cashierList from './cashierList';
import payConfirm from './payConfirm';
import paySuccess from './paySuccess';

const routesConfig = (<Route path="/" component={App}>
  <Route path='/order/:cartId' component={order} title='确认订单'/>
  <Route path='/address' component={address} title='收货地址管理' />
  <Route path='/addressAdd' component={addressAdd} title='添加地址' />
  <Route path='/addressEdit' component={addressEdit} title='编辑地址'/>
  <Route path='/coupon/:cartIds' component={coupon} title='店铺优惠券' />
  <Route path='/invoice/:invoiceShow/:invContent' component={invoice} title='发票信息' />
  <Route path='/cashier/:orderCode/:totalPrice' component={cashier} title='选择支付方式' />
  <Route path='/cashierList/:orderCode/:totalPrice' component={cashierList} title='选择支付方式' />
  <Route path='/payConfirm/:orderCode/:totalPrice' component={payConfirm} title='支付确认' />
  <Route path='/paySuccess/:paySn' component={paySuccess} title='订单支付成功' />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
