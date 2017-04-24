import { fetch, common } from 'common';

// 优惠券列表
export function couponlist({ storeId }) {
  // http://testbbc.leimingtech.com/memberapi/centRecommendList
  return fetch.get('/storeapi/couponlist', { storeId });
}
