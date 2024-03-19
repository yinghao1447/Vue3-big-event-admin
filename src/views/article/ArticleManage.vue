<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
const articleList = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(true)
const total = ref(0)
const cateId = ref(4469)
const onEditArticle = (row) => {
  console.log(row)
}
const onDelArticle = (row) => {
  console.log(row)
}
const getArticleList = async () => {
  loading.value = true
  const { data } = await artGetListService(params.value)
  console.log(data)
  articleList.value = data.data
  total.value = data.total
  loading.value = false
}

const onCurrentChange = (val) => {
  params.value.pagenum = val
  getArticleList()
}

const onSizeChange = (val) => {
  params.value.pagesize = val
  getArticleList()
}
getArticleList()
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类">
        <!-- v-model 是 v-model:modelValue 的缩写
          :modelValue 是绑定值，可以更改
          v-model:modelValue="cateId" 等价于 v-model="cateId"
          如果改变成了:cardId="cateId" 则表示绑定值是 cateId
          子组件中也要改成 defineProps({ cardId: { type: String } }) const emit = defineEmits(['update:cardId'])
        -->
        <ChannelSelect v-model:modelValue="cateId"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select size="large" placeholder="请选择" style="width: 240px">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="cate_name" label="分类" width="180" />
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          > -->
          <el-button plain type="primary" :icon="Edit" circle @click="onEditArticle(row)" />
          <el-button plain type="danger" :icon="Delete" circle @click="onDelArticle(row)" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: right"
    />
  </page-container>
</template>

<style lang="scss" scoped></style>
