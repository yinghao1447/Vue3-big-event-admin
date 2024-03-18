import request from '@/utils/request'

//获取文章分类

export const artGetChannelsService = () => request.get('/my/cate/list')

//添加文章

export const artAddArticleService = (data) => request.post('/my/cate/add', data)

// 编辑文章

export const artEditArticleService = (data) => request.put('/my/cate/info', data)
