import { fetch, common } from 'common';

export function cartList() {
  return fetch.get('/cartapi/cartList');
}

export function addCart({ goodsId, count, specId, saveType }) {
  return fetch.get('/cartapi/addCart', {
    goodsId,
    count,
    specId,
    saveType
  });
}

// http://testbbc.leimingtech.com/cartapi/subToOrder
// timestamp	1490187693840
// sign	afMi9XzODGimPehcrqQfPLVwzFmwcS7UBKXSzAeiIACCJCiIbRJoc2l5cnvI/czZ5C8qqGPmh9nvqTXGxtpVxgFjlWtQknjdg0auk3tckit5/qeE6bkvL8BR7QNUimhdVAxuF1I35C5zHTnTfFMutNxkfpMq9EOPK36XIoWEwWU=
// cartId	7a81f776337440b5821e5102fd33f82d

// http://testbbc.leimingtech.com/cartapi/addShipping

// timestamp	1490187693969
// cartIds	7a81f776337440b5821e5102fd33f82d
// cityId	1101


// http://testbbc.leimingtech.com/cartapi/getPrice
// isPd	0
// freight	
// timestamp	1490187694115
// cartIds	7a81f776337440b5821e5102fd33f82d
// sign	fqLpsxBBShJIlgAUok7clxr1oUyqgnd8e6V/yy0f8bs6/oFQILe3Yn0Su4BGuuEfL3cykslfdhyCwZHe/Dlk2WyLXkG83Ja38Sbr/ePb+tfqXb+o2gfKR8S22CPMvKW/Qwa5dnEhxvMmmUpoeRrA9hb8j8gdTAjqmKYZCRsGGEU=
// couponId	
// cityId	1101
