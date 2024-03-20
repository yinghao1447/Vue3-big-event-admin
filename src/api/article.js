import request from '@/utils/request'

//获取文章分类

export const artGetChannelService = () => request.get('/my/cate/list')

//添加文章

export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 编辑文章

export const artEditChannelService = (data) => request.put('/my/cate/info', data)

// 删除分类

export const artDelChannelService = (id) => request.delete('/my/cate/del', { params: { id } })

//文章:获取文章列表

export const artGetListService = (params) => request.get('/my/article/list', { params })

//文章:添加文章

export const artAddService = (data) => request.post('/my/article/add', data)

//文章:编辑文章
