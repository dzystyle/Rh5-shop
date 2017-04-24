import { fetch, common } from 'common';

export function couponMemberList({
  couponIsUser
}) {
  return fetch.get('/couponApi/couponMemberList', {
    couponIsUser
  });
}

// http://testbbc.leimingtech.com/couponApi/couponMemberList
// couponIsUser	0
