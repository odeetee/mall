<template>
  <div class="page">
    <h2 class="title">登录</h2>
    <p class="tip">
      登录后会回到刚才想去的页面（守卫把原地址存在 query.from 里）。
    </p>

    <p v-if="from" class="from">原始目标地址：{{ from }}</p>

    <button class="btn" @click="login">模拟登录</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 守卫记下的原目标地址
// vue-router 会自动解码 query 里的内容，这里直接用即可
const from = route.query.from || ''

function login() {
  // 存一个假 token，真实项目这里换成后端返回的令牌
  localStorage.setItem('token', 'x')
  // 回跳到被拦截的那个地址；没有 from 就回首页
  router.replace(from || '/')
}
</script>

<style scoped>
.page {
  max-width: 420px;
  margin: 60px auto;
  padding: 32px;
  background: #fff;
  border: 1px solid #E3E6EB;
  border-radius: 12px;
}
.title {
  margin: 0 0 8px;
  font-size: 22px;
  color: #1F2329;
}
.tip {
  margin: 0 0 12px;
  font-size: 14px;
  color: #888780;
  line-height: 1.7;
}
.from {
  margin: 0 0 20px;
  padding: 8px 10px;
  font-family: Consolas, monospace;
  font-size: 13px;
  color: #185FA5;
  background: #EEF4FC;
  border-radius: 6px;
  word-break: break-all;
}
.btn {
  height: 38px;
  padding: 0 24px;
  font-size: 14px;
  color: #fff;
  background: #185FA5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>