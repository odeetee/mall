<template>
  <div class="content">
    <h2 class="title">商品管理</h2>
    <p class="tip">这是 /admin/products 子路由页面。切换侧栏时，外壳（侧栏）不会重新加载。</p>

    <ul class="list">
      <li v-for="p in list" :key="p.id">
        {{ p.id }} · {{ p.name }} · ¥{{ p.price }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 子路由页面里面没有导航条：外壳由 AdminLayout 负责，页面只管自己的内容
const list = ref([
  { id: 1, name: '机械Key', price: 199 },
  { id: 2, name: '无线Mouse', price: 99 },
  { id: 3, name: 'USB-C 扩展坞', price: 159 },
])
</script>

<style scoped>
.content {
  flex: 1;
  padding: 24px;
}
.title {
  margin: 0 0 8px;
  font-size: 22px;
  color: #1F2329;
}
.tip {
  margin: 0 0 16px;
  font-size: 14px;
  color: #888780;
}
.list {
  margin: 0;
  padding-left: 20px;
  font-size: 14px;
  color: #1F2329;
  line-height: 2;
}
</style>