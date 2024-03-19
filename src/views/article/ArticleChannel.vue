<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { artGetChannelService, artDelChannelService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ref } from 'vue'
const channelList = ref([])
const loading = ref(true)
const dialog = ref()
const getChannelList = async () => {
  loading.value = true
  const { data } = await artGetChannelService()
  loading.value = false
  channelList.value = data.data
}
getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDeleteChannel = async ({ id }) => {
  await ElMessageBox.confirm('确定删除该分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelChannelService(id)
  ElMessage.success('删除成功')
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.open({})
}
</script>

<template>
  <page-container>
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" index="1" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <!-- <el-button size="small" icon="Edit" @click="handleEdit($index, row)"></el-button> -->
          <el-button type="primary" :icon="Edit" plain circle @click="onEditChannel(row)" />
          <el-button type="danger" :icon="Delete" plain circle @click="onDeleteChannel(row)" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂时没有数据哦" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="getChannelList"></ChannelEdit>
  </page-container>
</template>
