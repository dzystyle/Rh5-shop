import { fetch, common } from 'common';

// 团购列表
export function groupPurchaseList({
  activityClass,
  pageNo,
  apKey,
  activityType,
  pageSize,
}) {
  return fetch.get('/groupPurchaseApi/list', {
    activityClass,
    pageNo,
    apKey,
    activityType,
    pageSize,
  });
}

// http://testbbc.leimingtech.com/groupPurchaseApi/list
// activityClass	20
// timestamp	1490427814437
// sign	pTbBPIv0+h+DLN7ZK3aoc2q8ocP1haiVtkgtxLgYf+exzUvNl6MaESjw4PljfdIxdfFilwSQFSczrj+4dpqClPhmHunrFk98Lo8OwWI1Ji+5L5mbkG0zAo2fM6iWQibuKMfsJ2iIbH/K+/suQOJobWw6/OJTwyB65bk7JKhOVUk=
// pageNo	1
// apKey	
// activityType	50
// pageSize	1

// activityClass	70
// timestamp	1490427814550
// sign	Lfkql+YQTomogkAm1BuVDNS36JAqVPnqBMRiSLqay+4pRoEtCUgT3Frwu0MxEXsfcjh15MqK5eLBkoEwatUhHrRn8DsY6T5KYmP00LkRaVjefHsx6Pn33jXOY+jBX+MIS8XziYOWG6G8ixve/gBVUHyoHVEzpDApsePPJ/yadKc=
// pageNo	1
// apKey	groupbanner
// activityType	50
// pageSize	15

// activityClass	60
// timestamp	1490427814550
// sign	Lfkql+YQTomogkAm1BuVDNS36JAqVPnqBMRiSLqay+4pRoEtCUgT3Frwu0MxEXsfcjh15MqK5eLBkoEwatUhHrRn8DsY6T5KYmP00LkRaVjefHsx6Pn33jXOY+jBX+MIS8XziYOWG6G8ixve/gBVUHyoHVEzpDApsePPJ/yadKc=
// pageNo	1
// apKey	groupbanner
// activityType	50
// pageSize	15
