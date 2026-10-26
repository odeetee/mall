<template>
<div class="toolbar">
    <input v-model.lazy.trim="keyword" @keyup.enter="doSearch" placeholder="搜索商品" />
    <select v-model="category">
      <option v-for="c in categories" :key="c" :value="c">
        {{ c === 'all' ? '全部分类' : c }}
      </option>
    </select>

    <label>
      价格上限
      <input v-model.number="priceMax" type="range" min="0" max="300" step="10" />
      <span>{{ priceMax === Infinity || priceMax >= 300 ? '不限' : `¥${priceMax}` }}</span>
    </label>

    <label>
      <input v-model="desc" type="checkbox" />
      价格降序
    </label>
    <span>购物车有：{{ cartCount }} 件商品</span>
  </div>
</template>

<script setup>
defineProps({
  categories: { type: Array, required: true },
  cartCount: { type: Number, default: 0 },
})

const keyword = defineModel('keyword', {})
const category = defineModel('category', {})
const priceMax = defineModel('priceMax', {})
const desc = defineModel('desc', {})

const emit = defineEmits(['search', 'reset'])

function doSearch() {
  emit('search', keyword.value)
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}
.toolbar select,
.toolbar input[type='text'] {
  padding: 6px 10px;
}
.cart {
  margin-left: auto;
  font-weight: bold;
}
</style>