<template>
  <nav>
    <router-link to="/">课程卡片</router-link>
    &nbsp;&nbsp;
    <router-link to="/list">商品列表</router-link>
    &nbsp;&nbsp;
    <router-link to="/cart">购物车</router-link>
    &nbsp;&nbsp;
    <!-- 新增：后台入口，没登录会被守卫拦截 -->
    <router-link to="/admin/products">后台</router-link>
    &nbsp;&nbsp;
    <router-link to="/login">登录</router-link>
  </nav>
  <router-view />

  <!-- 新加的Element Plus测试区域 -->
<div class="page" style="padding:20px;">
  <h2>第9周 · 第一个组件</h2>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="danger" :disabled="true">危险按钮</el-button>

  <el-divider />

  <el-input placeholder="请输入商品名称" style="width: 240px" />
  <el-select placeholder="请选择分类" style="width:240px;margin-left:12px">
    <el-option label="键盘" value="keyboard"/>
    <el-option label="鼠标" value="mouse"/>
  </el-select>
</div>
</template>

<script setup>
// 不用 import！插件自动导入
ElMessage.success('测试弹窗，ElMessage自动导入成功！')
</script>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 14px 20px;
  background: #fff;
  border-bottom: 1px solid #E3E6EB;
}

nav a {
  color: #1F2329;
  text-decoration: none;
  font-size: 14px;
}

/* 当前路由激活高亮 */
nav a.router-link-active {
  color: #185FA5;
  font-weight: bold;
}
</style>
