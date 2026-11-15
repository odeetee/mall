<template>
  <div class="admin">
    <aside class="side">
      <h3 class="brand">管理后台</h3>

      <!-- 子路由的完整地址是 /admin/products -->
      <router-link to="/admin/products">商品</router-link>
      <router-link to="/admin/orders">订单</router-link>

      <button class="logout" @click="logout">退出登录</button>
    </aside>

    <!-- 子路由渲染在这里：外壳只写一次，子页面各写各的 -->
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 登出：清掉 token 再改道回登录页
// 键名必须和守卫里的 localStorage.getItem('token') 完全一致
function logout() {
  localStorage.removeItem('token')
  router.replace('/login')
}
</script>

<style scoped>
.admin {
  display: flex;
  min-height: calc(100vh - 60px);
}
.side {
  width: 180px;
  padding: 20px 16px;
  background: #F7F8FA;
  border-right: 1px solid #E3E6EB;
}
.brand {
  margin: 0 0 16px;
  font-size: 15px;
  color: #1F2329;
}
.side a {
  display: block;
  padding: 8px 10px;
  margin-bottom: 4px;
  color: #1F2329;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
}
.side a.router-link-active {
  color: #185FA5;
  background: #E6F1FB;
  font-weight: bold;
}
.logout {
  width: 100%;
  margin-top: 24px;
  height: 34px;
  font-size: 13px;
  color: #C8442B;
  background: #fff;
  border: 1px solid #E3E6EB;
  border-radius: 8px;
  cursor: pointer;
}
</style>