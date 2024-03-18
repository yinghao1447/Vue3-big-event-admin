<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])
const loading = ref(true)
const getChannelList = async () => {
  const { data } = await artGetChannelsService()
  loading.value = false
  channelList.value = data.data
}
getChannelList()

const onEditChannel = (index, row) => {
  console.log(index, row)
}
const onDeleteChannel = (index, row) => {
  console.log(index, row)
}
</script>

<template>
  <page-container>
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" index="1" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row, $index }">
          <!-- <el-button size="small" icon="Edit" @click="handleEdit($index, row)"></el-button> -->
          <el-button type="primary" :icon="Edit" plain circle @click="onEditChannel($index, row)" />
          <el-button
            type="danger"
            :icon="Delete"
            plain
            circle
            @click="onDeleteChannel($index, row)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂时没有数据哦" />
      </template>
    </el-table>
  </page-container>
</template>
