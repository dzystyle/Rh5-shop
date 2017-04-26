import { fetch, common } from 'common';

// 圈子
export function myCircle() {
  return fetch.get('circleApi/myCircle');
}

// 圈子列表
export function list({
  pageNo,
  pageSize
}) {
  return fetch.get('circleApi/list', {
    pageNo,
    pageSize
  });
}

export function circleType() {
  return fetch.get('circleApi/circleType');
}

export function addcircle({
  circleClassId,
  circleName,
  circleDescription,
  circlePhoto
}) {
  return fetch.get('circleApi/addcircle', {
    circleClassId,
    circleName,
    circleDescription,
    circlePhoto
  });
}

// 圈子明细
export function circleDetail({
  pageNo,
  circleId,
  pageSize,
}) {
  return fetch.get('circleApi/circleDetail', {
    pageNo,
    circleId,
    pageSize,
  });
}

// 点赞
export function clickGoods({
  postingsId
}) {
  return fetch.get('circleApi/clickGoods', {
    postingsId
  });
}

// 关注
export function circleFavorites({
  circleId
}) {
  return fetch.get('circleApi/circleFavorites', {
    circleId
  });
}

// 是否关注
export function selectFavorites({
  circleId,
  postingsId
}) {
  return fetch.get('circleApi/selectFavorites', {
    circleId,
    postingsId
  });
}

export function getUserInfo() {
  return fetch.get('circleApi/getUserInfo');
}

export function postingsList({
  pageNo,
  pageSize,
}) {
  return fetch.get('circleApi/postingsList', {
    pageNo,
    pageSize,
  });
}

// 帖子明细
export function postingsDetail({
  postingsId,
  selectType,
  pageNo,
}) {
  return fetch.get('circleApi/postingsDetail', {
    postingsId,
    selectType,
    pageNo,
  });
}

// 发布帖子
export function postingsSave({
  postingsName,
  postingsContent,
  circleId
}) {
  return fetch.get('circleApi/postingsSave', {
    postingsName,
    postingsContent,
    circleId
  });
}

// 删除帖子
export function deletePosting({
  postingsId
}) {
  return fetch.get('circleApi/delete', {
    postingsId
  });
}

// 评论
export function findCommentsList({
  postingsId,
  pageNo,
  pageSize,
}) {
  return fetch.get('circleApi/findCommentsList', {
    postingsId,
    pageNo,
    pageSize,
  });
}

export function saveReply({
  comments,
  postingsId,
}) {
  return fetch.get('circleApi/saveReply', {
    comments,
    postingsId,
  });
}

export function findReplysList({
  commentId,
  pageNo,
  pageSize,
}) {
  return fetch.get('circleApi/findReplysList', {
    commentId,
    pageNo,
    pageSize,
  });
}


export function saveComments({
  postingsId,
  comments
}) {
  return fetch.get('circleApi/saveComments', { postingsId, comments });
}

// 文件上传
export function filesUpload({
  images
}) {
  return fetch.upload('/memberapi/filesUpload', {
    images
  });
}

export function circleSearch({
  pageNo,
  pageSize,
  searchType,
  keyword
}) {
  return fetch.get('/circleApi/circleSearch', {
    pageNo,
    pageSize,
    searchType,
    keyword
  });
}

export function postingSearch({
  searchType,
  pageNo,
  keyword,
}) {
  return fetch.get('/circleApi/postingSearch', {
    searchType,
    pageNo,
    keyword,
  });
}

// 会员信息
export function memberDetail() {
  return fetch.get('/memberapi/memberDetail');
}
