import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import home from './home';
import store from './store/store';
import storeDetail from './store/storeDetail';
import storeGoods from './store/storeGoods';
import storeNewGoods from './store/storeNewGoods';
import storeCoupon from './store/storeCoupon';

import gotoSearch from './gotoSearch';
import goodsSearch from './goodsSearch';

import attention from './attention';
import viewRecord from './viewRecord';
import myIntegral from './myIntegral';
import coupon from './coupon';

import my from './my';
import orderList from './orderList';
import orderDetail from './orderDetail';

import afterSale from './afterSale/afterSale';
import applyAfterSale from './afterSale/applyAfterSale';
import progress from './afterSale/progress';
import progressDetail from './afterSale/progressDetail';
import returnDetail from './afterSale/returnDetail';
import returnGoods from './afterSale/returnGoods';
import changeGoods from './afterSale/changeGoods';

import commentList from './commentList';
import comment from './comment';

import account from './account/account';
import accountSafe from './account/accountSafe';
import recharge from './account/recharge';
import balance from './account/balance';
import lockBalance from './account/lockBalance';
import updateNickName from './account/updateNickName';
import updatePassword from './account/updatePassword';
import createPayword from './account/createPayword';

import address from './address/address';
import addressAdd from './address/addressAdd';
import addressEdit from './address/addressEdit';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={home} showBottomBar={true} showTitle={false} selectedTab='home'/>
  <Route path='store/:storeId/'>
    <Route path='index' component={store} showTitle={false}/>    
    <Route path='detail' component={storeDetail} title='店铺详情'/>
    <Route path='goods(/:goodsName)' component={storeGoods} title='店铺商品' />
    <Route path='newgoods' component={storeNewGoods} title='上新' />
    <Route path='coupon' component={storeCoupon} title='优惠券' />
  </Route>
  
  <Route path='/gotoSearch' component={gotoSearch} showTitle={false}/>
  <Route path='/search/:searchType(/:keyword)' component={goodsSearch} title='商品搜索' />
  
  <Route path='/attention(/:type)' component={attention} title='我的关注' />
  <Route path='/viewRecord(/:type)' component={viewRecord} title='浏览记录' />
  <Route path='/myIntegral' component={myIntegral} title='我的积分' />
  <Route path='/coupon(/:couponIsUser)' component={coupon} title='我的优惠券' />

  <Route path='/my' component={my} title='我的' showBottomBar={true} selectedTab='my'/>
  <Route path='/orderList/(:type)' component={orderList} title='订单列表'/>
  <Route path='/orderDetail/(:id)' component={orderDetail} title='订单详情'/>

  <Route path='/afterSale' component={afterSale} title='售后列表' />
  <Route path='/applyAfterSale' component={applyAfterSale} title='申请售后' />
  <Route path='/progress(/:type)' component={progress} title='进度查询' />
  <Route path='/progressDetail/:type/:refundId' component={progressDetail} title='进度详情' />
  <Route path='/returnDetail/:refundId' component={returnDetail} title='退款详情' />
  <Route path='/returnGoods/:refundId' component={returnGoods} title='填写快递单号' />
  <Route path='/changeGoods/:barterId' component={changeGoods} title='填写换货快递单号' />

  <Route path='/commentList' component={commentList} title='评价晒单' />
  <Route path='/comment' component={comment} title='评价晒单'/>
  
  <Route path='/account' component={account} title='账户管理' />
  <Route path='/accountSafe' component={accountSafe} title='账户安全'/>
  <Route path='/recharge' component={recharge} title='余额充值' />
  <Route path='/updateNickName' component={updateNickName} title='账户管理'/>
  <Route path='/updatePassword' component={updatePassword} title='修改密码'/>
  <Route path='/createPayword' component={createPayword} title='设置支付密码'/>

  <Route path='/balance' component={balance} title='可用余额'/>
  <Route path='/lockBalance' component={lockBalance} title='锁定余额' />
  
  <Route path='/address' component={address} title='地址管理' />
  <Route path='/addressAdd' component={addressAdd} title='添加地址' />
  <Route path='/addressEdit' component={addressEdit} title='编辑地址'/>
  
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
