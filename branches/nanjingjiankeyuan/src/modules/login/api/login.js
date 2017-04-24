import { fetch, common } from 'common';

export function login({ username, password }) {
  return fetch.get('/loginapi/login', {
    username,
    password
  });
}

export function verifyCode({ mobile }) {
  return fetch.get('/floor/api/verifyCode', {
    mobile
  });
}

export function register({ name, password, mobile }) {
  return fetch.get('/memberapi/register', {
    name,
    password,
    mobile
  });
}

// 重置密码-重新获取验证码 
export function findCode({ mobile }) {
  return fetch.get('/memberapi/findCode', {
    mobile
  });
}

// 重置密码
export function updatePassword({ newpassword, memberId }) {
  return fetch.get('/memberapi/updatePassword', {
    newpassword,
    memberId
  });
}
