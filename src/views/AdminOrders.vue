<template>
  <div class="content">
    <h2 class="title">订单管理</h2>
    <p class="tip">这是 /admin/orders 子路由。和商品管理共用同一个外壳。</p>

    <ul class="list">
      <li v-for="o in list" :key="o.id">
        {{ o.id }} · {{ o.user }} · ¥{{ o.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 这正是嵌套路由要的效果：两个内容页，一个外壳
const list = ref([
  { id: 1001, user: '张三', amount: 199 },
  { id: 1002, user: '李四', amount: 258 },
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