const domain = location.host;

export const IMAGE_DOMAIN = 'http://testbbc.leimingtech.com';
export const SERVER_DOMAIN = 'http://testbbc.leimingtech.com';

export const sign_key = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALp+nkNsb0dfqNq3TxQe53JNd/C3rRdoMG3l+n7CjTGA60y6O+ssZ/j5kzwFrVBaSwIkpBIX1j/NhOTf2s+ItwjU1dliKKD6Da4kBABaGJPwDSYZVo05PmaywRb11knijgXdIq4c/Yn4tIbagoE4pEkBWeKRe+EpUedsrn1mVh/lAgMBAAECgYB8zF58IAQXbxw/wItam5OmGdE5dLCQCVjfMhb+3JI/nlXXcojGR2EMa3bro6DnNIUdWgexU+I7r/xObL6wQny4d8UJNN6SWbLIxkb2YjoUk5SaBO7bqFlEiyWJN0cp21h9KQIwAlbHeGIpll5SIR5uMqx4gTXcIzOqtyz/xtSyAQJBANqHPN7R3Oe8ALmMBwIh7YmA9sL3osSu6zer6Wa0qBlntyuv+6eB1VvON8JlZOCFA3mJoRHvmKeq1JCiMEzhUjkCQQDaeTHL3NdbO1dYQgKhLwWV2JjpyskSF3xjlNNbS0e8nu0Vwn+f8GTba0tO/BeVkuaKLfX0NbhXt/2YYkdhQIsNAkBwdqkdA2Rs3pSA6U+yCUP2QCi+rjNWha8IN7Em6lKYwIfENA2PZ4ImfTq1EPmZktr28Z2zXVty7rf2t4GkD1IBAkB2P8LEJPQrXSMZkiD6PQk44dNiN3A9apjZDWSYtVZOsXaBoJSTbPoqCRjp12isfKZrhBTr6Wetktif8hHQga7BAkEAmhOwXzYFD1jqd+cvgh0ImdWBDfq2qrfqYFhne+o0iEzHxukOty+GLm/mmaAkb/VvLX75qf/zNMNrTk5ZwXgtBA=='

export function getFullUrl(requestUrl) {
  let url = location.protocol + '//' + domain;
  if (requestUrl.startsWith("/")) {
    url = url + requestUrl;
  } else {
    url = url + "/" + requestUrl;
  }

  return url;
}

export function isWechat() {
  return navigator.userAgent.indexOf('MicroMessenger') > -1;
}

export function isQQ() {
  return navigator.userAgent.indexOf('QQ') > -1;
}

/**
 * 去登录
 * @param {登录成功后返回的页面} callBack 
 */
export function gotoLogin(callBack) {
  if (callBack) {
    window.location.href = `login.html#/?callBack=${callBack}`;
  } else {
    window.location.href = 'login.html';
  }
}

/**
 * 去登录回调
 */
export function gotoLoginAndBack() {
  // 获取当前URL,作为登录回调
  const currentUrl = window.location.href;
  gotoLogin(encodeURIComponent(currentUrl));
}

export function gotoCart() {
  window.location.href = 'cart.html';
}

export function gotoGoodsDetail({ specId }) {
  // window.location.href = `goodsDetail.html#/?specId=${specId}`;
  window.location.href = `goodsDetail.html#/${specId}`;
}

export function gotoStore({ storeId }) {
  window.location.href = `home.html#/store/${storeId}/index`;
}

export function gotoOrder({ cartId }) {
  window.location.href = `order.html#/order/${cartId}`;
}

export function gotoPay({ paySn, orderTotalPrice }) {
	window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/'+paySn+'/'+orderTotalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
  window.location.href = `order.html#/cashierList/${paySn}/${orderTotalPrice}`;
}

// 获取token
export function getToken() {
  return localStorage.getItem('token');
}

function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function removeToken() {
  localStorage.removeItem('token');
  document.cookie = 'TOKEN=;';
}

/**
 * 是否登录
 */
export function isLogin() {
  const token = getToken();
  if (!token || token == '') {
    return false;
  }
  return true;
}

/**
 * 检查登录
 * @param {登录成功后返回的页面} callBack 
 */
export function checkLogin(callBack) {
  if (!isLogin()) {
    // 获取当前URL,作为登录回调
    const currentUrl = callBack || window.location.href;
    gotoLogin(encodeURIComponent(currentUrl));
  }
}

export function setCartNum(num) {
  localStorage.setItem('_cartnum', num);
}

export function getCartNum() {
  return localStorage.getItem('_cartnum') || 0;
}
