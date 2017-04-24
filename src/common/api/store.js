import { fetch, common } from 'common';

// 优惠券列表
export function couponlist({ storeId }) {
  return fetch.get('/storeapi/couponlist', { storeId });
}

// 领券
export function receiveCoupon({ couponId, storeId }) {
  return fetch.get('/storeapi/receiveCoupon', { couponId, storeId });
}
