import { fetch, common } from 'common';
import areaData from './area';

// http://testbbc.leimingtech.com/address/api/addressList

// 地址列表
export function addressList() {
  return fetch.get('/address/api/addressList');
}

// 地址列表
export function saveAddress({
  address,
  trueName,
  mobPhone,
  areaInfo,
  zipCode,
  areaId,
  provinceId,
  addressId = null,
  telPhone,
  cityId,
}) {
  return fetch.get('/address/api/saveAddress', {
    address,
    trueName,
    mobPhone,
    areaInfo,
    zipCode,
    areaId,
    provinceId,
    addressId,
    telPhone,
    cityId,
  });
}

// 地址列表
export function updateAddressDef(addressId) {
  return fetch.get('/address/api/updateAddressDef', { addressId });
}

// 地址列表
export function delAddress(addressId) {
  return fetch.get('/address/api/delAddress', { addressId });
}

export function getAreaData() {
  let convertedData = areaData.map(item => {
    let province = {
      value: item.areaId,
      label: item.areaName,
    };

    const cityList = item.children.map(city => {
      return {
        value: city.areaId,
        label: city.areaName,
        children: city.children.map(area => {
          return {
            value: area.areaId,
            label: area.areaName
          }
        })
      }
    })

    province.children = cityList
    return province;
  })

  return convertedData;
}
