import { fetch, common } from 'common';

export function subToOrder({ cartId }) {
  return fetch.get('/cartapi/subToOrder', {
    cartId
  });
}

export function addShipping({ cartIds, cityId }) {
  return fetch.get('/cartapi/addShipping', {
    cartIds,
    cityId
  });
}

export function getPrice({
  isPd,
  freight,
  cartIds,
  couponId,
  cityId,
}) {
  return fetch.get('/cartapi/getPrice', {
    isPd,
    freight,
    cartIds,
    couponId,
    cityId,
  });
}

// 获取优惠券
export function addCouponMember({ cartIds }) {
  return fetch.post('/cartapi/addCouponMember', {
    cartIds
  });
}

// 发票信息
export function addInvoice({ invState, invTitle, invContent }) {
  return fetch.get('/invoiceapi/addInvoice', { invState, invTitle, invContent });
}

export function saveorder({
  paytype,
  invoiceId,
  isPd,
  addressId,
  freight,
  cartIds,
  couponId,
}) {
  return fetch.get('/orderapi/saveorder', {
    paytype,
    invoiceId,
    isPd,
    addressId,
    freight,
    cartIds,
    couponId,
  });
}

// check 余额支付密码
export function chkPasswd({ passwd }) {
  return fetch.post('/memberapi/chkPasswd', {
    passwd
  });
}

// 获取支付结果
export function getOrderPay({ paySn }) {
  // http://testbbc.leimingtech.com/orderapi/getOrderPay
  // paySn	P20170325143406611
  return fetch.post('/orderapi/getOrderPay', {
    paySn
  });
}
//支付宝支付
export function toAliH5pay({ orderCode }) {
	console.log(orderCode)
  return fetch.post('/alipayh5/api/toAliH5pay', {
    orderCode
  });
}
// 微信支付
export function towxpayInfo({ orderCode,code }) {
  return fetch.post('/wxh5pay/api/towxpayInfo', {
    orderCode,
    code
  });
}
// http://testbbc.leimingtech.com/memberapi/chkPasswd

// 银联支付
// http://testbbc.leimingtech.com/unionpay/api/tounionpay
// orderCode	P20170324105020308

// 微信支付
// http://testbbc.leimingtech.com/wxpay/api/towxpayInfo
// orderCode	P20170324105020308

// http://testbbc.leimingtech.com/alipay/api/alipaySignOrderInfo
// timestamp	1490323983463
// sign	TTrwd9WyZhZ2dVkHU6Bhi9lJfvmxuroRpaZlqsAO5Xfk9g62JuDhUC3ffY4e91EDoptlyq4OeexzfhCkChiEfWUkHHJOc2XVwsPjbTL3v1Nu4nryUwkOpmzwditB8L85EK8E/CJ1KEw44RMB9cWQCwAGLXGO1v3WfczDrvFR3Yk=
// orderCode	P20170324105020308

// http://testbbc.leimingtech.com/orderapi/saveorder
// paytype	1
// invoiceId	
// isPd	0
// sign	ObjzIIQNAQHfZY1+xAUSfIKBUm9KY/2FFshgrxf9eQ9PM2PV1n/c2Oh+qO4TUNNY+5gBlCJjHy48ZiVGNkhXk4wikmepAZsOz/EQNeAuLuXxo3sYiKYdL0NUK/Mcjf/ar9EyF+nPZkhcBThVyJk3DtAeaYPf3cRVtBmZ8ke+qwU=
// addressId	7f624584104449969cc1334647cf8e53
// freight	
// timestamp	1490323819033
// cartIds	8afd6ed4073e4976b96d38a737ec79f5
// couponId
