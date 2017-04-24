import { fetch, common } from 'common';

export function cartList() {
  return fetch.get('/cartapi/cartList');
}

export function deleteCart({
  cartId
}) {
  return fetch.get('/cartapi/deleteCart', {
    cartId
  });
}

export function updateCartCount({
  cartId,
  count
}) {
  return fetch.get('/cartapi/updateCartCount', {
    cartId,
    count
  });
}


// count	3
// timestamp	1490844450799
// sign	YAtBlC2KYPvWX1sDXslzCPWuXoKXJmdHx0Pd43/OUXninGQfHkx03QWNCkS4I0wBVYctQ/X9B1WBg6ogwXKqTRcBLQX1qB6SYREbpI/X75CYWYDT1Gebo9HF/dPF83oKSDBRH+CH31R55IygU70R7fz4NZC5+txgjocM+4yRT4M=
// cartId	1cff2198b2544a3d84593ee907260dbb

// http://testbbc.leimingtech.com/cartapi/updateCartCount

// http://testbbc.leimingtech.com/cartapi/deleteCart
// cartId	0092ae7af4bc4ced9aa0a86dfb6b0501,bac6cc29f1174f48af48fe3f28fef73d
