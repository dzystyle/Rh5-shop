import { fetch, common } from 'common';

// 筛选属性数据
export function goodsfiltermore({
  keyword,
  searchType
}) {
  return fetch.get('/goods/api/goodsfiltermore', {
    keyword,
    searchType
  });
}

// 商品搜索
export function goodslist({
  sortOrder,
  areaId,
  maximumPrice,
  minimumPrice,
  pageSize,
  keyword,
  pageNo,
  searchType,
  sortField,
  specFilter
}) {
  return fetch.get('/goods/api/goodslist', {
    sortOrder,
    areaId,
    maximumPrice,
    minimumPrice,
    pageSize,
    keyword,
    pageNo,
    searchType,
    sortField,
    specFilter
  });
}

// http://testbbc.leimingtech.com/goods/api/goodsfiltermore
// keyword	一
// searchType	keywordSearch

// http://testbbc.leimingtech.com/goods/api/goodslist

// sortOrder	desc
// sign	DmxAgqIngyimHn7iv1PCxJf5Y5nPPNrPDfJ+VHORSCAFITQHx67k3FU9KvTBIN0WpMKQ/nSPrezINRspAbFsnUoTgmO3IbKLmGdclQTQr9isofDcuARsgiAWK1SBje3Elu3qKJJ5wOE11qLHJ/qIeNI6zynRFVAF68PXJJOO4cY=
// areaId	
// maximumPrice	
// minimumPrice	
// pageSize	20
// keyword	一
// timestamp	1490972750760
// pageNo	1
// searchType	keywordSearch
// sortField

// 规格过滤
// sortOrder	desc
// areaId	
// maximumPrice	
// minimumPrice	
// pageSize	20
// keyword	一
// specFilter	acad456bd0e0411e841d223a8aa1ace7,9649f6d978714e10ac42673f117eb647
// pageNo	1
// searchType	keywordSearch
// sortField
