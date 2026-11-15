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
</template>

<script setup>
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