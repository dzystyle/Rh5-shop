import { fetch, common } from 'common';

export function couponlist({
  storeId
}) {
  return fetch.get('/storeapi/couponlist', {
    storeId
  });
}

// 领券
export function receiveCoupon({ couponId, storeId }) {
  return fetch.get('/storeapi/receiveCoupon', { couponId, storeId });
}
