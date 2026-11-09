<template>
  <div class="page">
    <router-link to="/list" class="back">← 返回商品列表</router-link>

    <!-- 状态1：加载中 -->
    <div v-if="state === 'loading'" class="skeleton">
      <div class="bar"></div>
      <div class="bar short"></div>
    </div>

    <!-- 状态2：成功 -->
    <div v-else-if="state === 'ok'">
      <h2 class="title">{{ detail.name }}</h2>
      <p class="price">¥{{ detail.price }}</p>
      <p class="meta">分类：{{ detail.category }}</p>
      <p class="tip">当前商品 id = {{ id }}</p>
      <p>库存：{{ detail.stock }}</p>
      <div>
        <img v-if="detail.img" :src="detail.img" alt="detail.name" class="cover" />
      </div>
    </div>

    <!-- 状态3：失败 -->
    <div v-else-if="state === 'fail'" class="error">
      <p class="msg">{{ errorMsg }}</p>
      <button class="retry" @click="load">重试</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api'

// useRoute() 拿到当前路由对象（响应式）
const route = useRoute()
const detail = ref(null)
const state = ref('loading')
const errorMsg = ref('')

// 动态段 :id 的值在这里
const id = ref(route.params.id)

async function load() {
  state.value = 'loading'
  errorMsg.value = ''
  try {
    detail.value = await api.getProduct(id.value)
    state.value = 'ok'
  } catch (e) {
    state.value = 'fail'
    errorMsg.value = e.message
  }
}

// watch：从商品1跳到商品2，组件复用，onMounted 不会再次触发
watch(
  () => route.params.id,
  (newId) => {
    id.value = newId
    load()
  },
  { immediate: true }
)
</script>

<style scoped>
.page {
  padding: 20px;
}
.back {
  color: #185FA5;
  text-decoration: none;
  font-size: 14px;
}
.title {
  margin: 16px 0 8px;
  color: #1F2329;
}
.price {
  margin: 0 0 8px;
  font-size: 20px;
  color: #C8442B;
}
.meta {
  margin: 0 0 6px;
  font-size: 14px;
  color: #888780;
}
.tip {
  font-size: 14px;
  color: #888780;
}
.skeleton {
  padding: 24px 0;
}
.bar {
  height: 18px;
  margin-bottom: 12px;
  background: #F2F3F5;
  border-radius: 6px;
}
.bar.short {
  width: 40%;
}
.cover {
  width: 240px;
  height: 160px;
  object-fit: cover;
  background: #F7F8FA;
  border-radius: 8px;
  margin: 16px 0;
}
.error {
  padding: 24px 0;
}
.msg {
  margin: 0 0 12px;
  font-size: 14px;
  color: #C8442B;
}
.retry {
  height: 34px;
  padding: 0 18px;
  font-size: 14px;
  background: #185FA5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>