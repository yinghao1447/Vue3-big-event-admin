<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artAddService, artGetDetailService, artEditService } from '@/api/article'
import { baseURL } from '@/utils/request'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const title = ref('')
const visibleDrawer = ref(false)
const imageUrl = ref('')
const formRef = ref()
const editRef = ref()
const defaultFromData = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultFromData })
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    title.value = '编辑文章'
    const {
      data: { data }
    } = await artGetDetailService(row.id)
    formModel.value = data
    imageUrl.value = baseURL + data.cover_img
    const file = await urlToFile(imageUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    title.value = '添加文章'
    await nextTick(() => {
      editRef.value.setHTML('')
      imageUrl.value = ''
      formModel.value = { ...defaultFromData }
    })
  }
}

const selectFile = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw)
  formModel.value.cover_img = file.raw
}
const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传文章封面', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  await formRef.value.validate()

  formModel.value.state = state
  const fd = new FormData()
  //使用递归转换普通对象
  for (const key in formModel.value) {
    if (formModel.value[key]) {
      fd.append(key, formModel.value[key])
    }
  }
  if (formModel.value.id) {
    console.log('编辑')
    await artEditService(fd)
    ElMessage.success('编辑成功')
    emit('success', 'edit')
    visibleDrawer.value = false
  } else {
    await artAddService(fd)
    ElMessage.success('添加成功')
    emit('success', 'add')
    visibleDrawer.value = false
  }
}
async function urlToFile(url, fileName) {
  try {
    const response = await axios.get(url, {
      responseType: 'blob' // 设置响应类型为 Blob
    })

    // 获取图片的 Blob 对象
    const blob = response.data

    // 创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('下载图片失败:', error)
    throw error
  }
}

defineExpose({
  open
})
</script>
<template>
  <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" width="50%">
    <el-form :model="formModel" label-width="100px" :rules="rules" ref="formRef">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <ChannelSelect v-model="formModel.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="selectFile"
          list-type="picture-card"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            v-model:content="formModel.content"
            ref="editRef"
            content-type="html"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px !important;
  }
}
</style>
