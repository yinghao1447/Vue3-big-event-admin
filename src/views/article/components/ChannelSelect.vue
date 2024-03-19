<script setup>
import { ref } from 'vue'
import { artGetChannelService } from '@/api/article'
const channelList = ref([])
defineProps({
  modelValue: {
    type: [String, Number]
  }
})

const emit = defineEmits(['update:modelValue'])
const getChannelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="($event) => emit('update:modelValue', $event)"
    size="large"
    placeholder="请选择"
    style="width: 240px"
  >
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    />
  </el-select>
</template>
