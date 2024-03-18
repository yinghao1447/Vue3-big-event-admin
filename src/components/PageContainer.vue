<script setup></script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="card-header">
        <span>文章分类</span>
        <slot name="extra"></slot>
        <!-- <el-button>添加分类</el-button> -->
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
