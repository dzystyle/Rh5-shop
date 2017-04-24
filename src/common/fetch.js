import qs from 'qs';
import { getFullUrl, getUserId, getVerifyCode, isApp } from './common';
import fetch from 'isomorphic-fetch';
import React from 'react';
import { Modal } from 'antd-mobile';
import { common } from 'common';
// import Encrypt from 'jsencrypt';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.text()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  const json = JSON.parse(response);
  // check 通用错误码
  if (json.result == 0) {
    if (json.code == '99' || json.msg.includes('您尚未登录或登录时间过长')) {
      Modal.alert('', <div style={{lineHeight:'0.7rem'}}>{json.msg}</div>, [{
        text: '去登录',
        onPress: () => {
          common.gotoLoginAndBack();
        }
      }])
    }
  }
  return json;
}

export function get(requestUrl, params) {
  const baseParams = {
    timestamp: new Date().getTime()
  };

  params = {
    ...baseParams,
    ...params
  }
  let url = getFullUrl(requestUrl);
  if (params) {
    url = url + "?" + qs.stringify(params);
  }

  // var encrypt = new JSEncrypt();
  // encrypt.setPublicKey($('#pubkey').val());
  // var encrypted = encrypt.encrypt($('#input').val());

  const token = localStorage.getItem('token');
  let headers = {}
  if (token) {
    headers['token'] = token;
  }
  return fetch(url, {
      headers,
      // credentials: 'include',
    }).then(checkStatus)
    .then(parseJSON);
}

export function post(requestUrl, params) {
  const baseParams = {
    timestamp: new Date().getTime()
  }

  let url = getFullUrl(requestUrl);
  const token = localStorage.getItem('token');
  params = {
    ...params,
    ...baseParams
  }
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  if (token) {
    headers['token'] = token;
  }
  return fetch(url, {
    method: "POST",
    headers,
    // credentials: 'include',
    body: qs.stringify(params),
  }).then(checkStatus).then(parseJSON);
}

export function upload(requestUrl, data) {
  const baseParams = {
    timestamp: new Date().getTime()
  }
  const token = localStorage.getItem('token');
  let formData = new FormData();
  if (Array.isArray(data.images)) {
    data.images.forEach(function(element) {
      formData.append('images', element);
    });
  } else {
    formData.append('images', data.images)
  }
  let url = getFullUrl(requestUrl);
  let headers = {}
  if (token) {
    headers['token'] = token;
  }
  return fetch(url, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: formData
  }).then(checkStatus).then(parseJSON);

  // return fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   credentials: 'include',
  //   body: qs.stringify(params),
  // }).then(checkStatus).then(parseJSON);
}
