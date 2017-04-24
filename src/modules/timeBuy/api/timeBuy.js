import { fetch, common } from 'common';

export function flashSaleApiList({
  activityClass,
  pageNo,
  activityType,
  pageSize,
}) {
  return fetch.get('/flashSaleApi/list', {
    activityClass,
    pageNo,
    activityType,
    pageSize,
  });
}

// 获取tab
// http://testbbc.leimingtech.com/flashSaleApi/list
// activityClass	30
// timestamp	1490427454206
// sign	e57nRc065tkXK5FaIKxCvPxy1PlWKpu6ofNiMZcESXMjvL29+yNLm6RVnUmb8ErtmU8zSgf/qSGDVg0JM4QMpdK4+s9tCiRWes8jdeRxL8Dqkhdofj0ckLx6ilq6jiMjJ0alamRxiYC9vJpwbSw4MRjGGzq94yHd5HY+xcnfZzo=
// pageNo	1
// activityType	60
// pageSize	1

// 今日抢购
// activityClass	30
// timestamp	1490427454367
// sign	PMS/idGogsOBJ4fecf5PMqVEWJhVCLSV1jn7Y0iDg2uQPhLZLxyC5S1iAzJjnvAHP8ocJWvBjL1WGunq2yQ7znbQ1dXkQFIJ35HYUJz68+HvJcD/CEFLcuskNwnkSuoMytqicgJtw95RobTBpDKjF2tdoJd59ryJ/rg4F6IbDXc=
// pageNo	1
// activityType	60
// pageSize	15

// 今日爆款
// activityClass	20
// timestamp	1490427652460
// sign	NPY86wbj2TD8O/AsOTVSp5J4LaRdVATXM5Wg7dzrdWI8W1UAVv7zaezFsQj0LkAMMqE0MJ/HZsX8h06ulyhBNWJbWjs8fvnu3eTP8ZK28EF+nKTFrYMsCEFF6bYtf5/p8ooJp8zs5HbVewQi3v/8cvb7n5IKn8ijQQ9AZ0YJ8U0=
// pageNo	1
// activityType	60
// pageSize	15

// 今日推荐
// activityClass	10
// timestamp	1490427716672
// sign	WJ2ki82ucHkbrVdPWM1lPrfeMr9mae9i62h2qjlt82X29bMygwg1cLStrczSDfoGE8ll8Rh6Z7PTSgmlEp9uOKfxMUOSYLuV2BKFO6zPSxenqe+gFEUgylBMKnEjjS4ZKX08H3WZWMPse/liWeqWcRQXZ6mi7tG6oqnvjBw6pmY=
// pageNo	1
// activityType	60
// pageSize	15
