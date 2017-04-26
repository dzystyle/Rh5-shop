import { fetch, common } from 'common';

// 资讯首页
export function index() {
  return fetch.get('/contentExhibitionApi/index');
}

// 新闻列表
export function articleList({ acId }) {
  return fetch.get('/contentExhibitionApi/articleList', { acId });
}

// 新闻明细
export function detailed({ contentId }) {
  return fetch.get('/contentExhibitionApi/detailed', { contentId });
}

// 评论列表
export function commentList({ contentId }) {
  return fetch.get('/contentExhibitionApi/commentList', { contentId });
}

// 评论
export function saveComment({
  contentComment,
  contentId
}) {
  return fetch.post('/contentExhibitionApi/saveComment', { contentId, contentComment });
}
