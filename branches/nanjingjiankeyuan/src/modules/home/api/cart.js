import { fetch, common } from 'common';

export function cartList() {
  return fetch.get('/cartapi/cartList');
}
