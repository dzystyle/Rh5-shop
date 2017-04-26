import { fetch, common } from 'common';

export function relGoodsRecommedlist() {
  return fetch.get('/floor/api/relGoodsRecommedlist');
}
