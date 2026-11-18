<template>
<el-container class="admin">
  <!-- 左侧侧边栏 -->
  <el-aside width="200px" class="side">
    <div class="brand">微商城后台</div>
    <!-- el-menu 开启路由模式，自动高亮 -->
    <el-menu router :default-active="$route.path" background-color="#F78FA">
      <el-menu-item index="/admin/products">
        <el-icon><Goods /></el-icon>
        商品管理
      </el-menu-item>
      <el-menu-item index="/admin/orders">
        <el-icon><List /></el-icon>
        订单管理
      </el-menu-item>
      <el-menu-item index="/admin/users">
        <el-icon><User /></el-icon>
        用户管理
      </el-menu-item>
    </el-menu>
  </el-aside>

  <!-- 右侧区域：头部 + 内容区 -->
  <el-container>
    <el-header class="header">
      <span class="title">微商城后台</span>
      <el-button type="danger" size="small" @click="logout">退出登录</el-button>
    </el-header>
    <el-main class="main">
      <!-- 嵌套路由出口 -->
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
// 新增：导入三个图标
import { Goods, List, User } from '@element-plus/icons-vue'

const router = useRouter()
// 退出：清掉token 再改道回登录页
// 键名必须和守卫里的 localStorage.getItem('token') 完全一致
function logout() {
  localStorage.removeItem('token')
  router.replace('/login')
}
</script>

<style scoped>
.admin {
  min-height: calc(100vh - 60px);
}
.side {
  background: #f7f8fa;
  border-right: 1px solid #e3e6eb;
}
.brand {
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 700;
  color: #1f2329;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e3e6eb;
}
.title {
  font-size: 16px;
  font-weight: 700;
}
.main {
  padding: 24px;
  background: #fff;
}
</style>