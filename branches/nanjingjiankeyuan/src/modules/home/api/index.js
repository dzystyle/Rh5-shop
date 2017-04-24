import { fetch, common } from 'common';

export function queryIndexData() {
  return fetch.get('/floor/api/indexListAll', {
    apKey: 'advh5'
  });
}
