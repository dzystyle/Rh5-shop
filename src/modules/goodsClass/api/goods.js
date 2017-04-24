import { fetch, common } from 'common';

export function queryClasslist() {
  return fetch.get('goods/api/classlist');
}

export function getGoodsClass({ advid, pId }) {
  return fetch.get('/goods/api/getGoodsClass', {
    advid,
    pId
  });
}
