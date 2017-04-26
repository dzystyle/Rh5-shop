import { fetch, common } from 'common';

// 浏览店铺记录
export function storeBrowseSaveOrUpdate({ storeId }) {
  return fetch.get('/storeapi/storeBrowseSaveOrUpdate', {
    storeId
  });
}

// 店铺首页信息
export function storedetail({ storeId }) {
  return fetch.get('/storeapi/storedetail', {
    storeId
  });
}

// 关注店铺/商品
export function storecollection({
  favType,
  goodsId,
  storeId
}) {
  return fetch.get('/storeapi/storecollection', {
    favType,
    goodsId,
    storeId,
  });
}

// 店铺商品
// http://testbbc.leimingtech.com/storeapi/storegoods
// order	desc
// orderField	
// sign	LOm2qqgbZcdA6WItNPGBA8/u2i2QJfDAIUo/ah7PTjJVKmIFBEYxyxUxx4NLn7AU4TR9EUYCYbIXmJX28Q5H9BBQpZGa7ychptseot33AM2SX0gIWtOjHsFN6xZVH5x7yXVdRICakX0NMMs76QpwSOb28mXbANBfbJ7Ft7KWew8=
// pageSize	20
// timestamp	1490670340469
// storeId	73947166753d454d8bc7c6e65a3c7267
// pageNo	1
// goodsName
// 关注店铺
export function storegoods({
  pageNo,
  pageSize,
  storeId,
  goodsName,
  goodsType,
  order,
  orderField
}) {
  return fetch.get('/storeapi/storegoods', {
    pageSize,
    storeId,
    pageNo,
    goodsName,
    goodsType,
    order,
	  orderField
  });
}

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
