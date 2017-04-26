import { fetch, common } from 'common';

export function centRecommendList() {
  return fetch.get('/memberapi/centRecommendList');
}

export function memberDetail() {
  return fetch.get('/memberapi/memberDetail');
}

export function goodsdetail({ specId }) {
  return fetch.get('goods/api/goodsdetail', { specId });
}

export function goodsBrowseSaveOrUpdate({ goodsId }) {
  return fetch.get('/memberapi/GoodsBrowseSaveOrUpdate', { goodsId });
}

// 获取规格
export function getSpecByGoodsIdAndSpecIds({ goodsId, specIds }) {
  return fetch.get('/goods/api/getSpecByGoodsIdAndSpecIds', { goodsId, specIds });
}

// 收藏
export function storecollection({ favType, goodsId, storeId }) {
  return fetch.get('/storeapi/storecollection', { favType, goodsId, storeId });
}

// 领券
export function receiveCoupon({ couponId, storeId }) {
  return fetch.get('/storeapi/receiveCoupon', { couponId, storeId });
}

// 评价列表
export function goodsEvaluteList({
  goodsId,
  gevalScore,
  gevalImg
}) {
  return fetch.get('/goods/api/goodsEvaluteList', {
    goodsId,
    gevalScore,
    gevalImg
  });
}

// 购买咨询
export function goodsConsultList({
  goodsId,
  pageNo
}) {
  return fetch.get('/goods/api/goodsConsultList', {
    goodsId,
    pageNo
  });
}

// 保存咨询
export function saveConsult({
  goodsId,
  cgoodsName,
  consultContent
}) {
  return fetch.get('/goods/api/saveConsult', {
    goodsId,
    cgoodsName,
    consultContent
  });
}
