<template>
  <div>
<SearchBar
  v-model:keyword="keyword"
  v-model:category="category"
  v-model:price-max="priceMax"
  v-model:desc="desc"
  :categories="categories"
  :cart-count="cartCount"
  @search="onSearch"
  @reset="onReset"
/>
  <p v-show="query">共 {{ sorted.length }} 件商品</p>
  
<div class="product-list">
  <ProductCard
  v-for="p in sorted"
  :key="p.id"
  :goods="p"
  :selected="selectedId === p.id"
  @click="selectedId = p.id"
/>
</div>

  <p v-if="sorted.length === 0">没有找到相关产品</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductFilter } from '@/composables/useProductFilter'
import SearchBar from '@/components/SearchBar.vue'

const cartCount = ref(0)

// PPT里带category的商品原始数据
const products = ref([
  { id: 1, name: '机械 Key', price: 199, stock: 5, category: 'keyboard', img: '/img/keyboard.png' },
  { id: 2, name: '无线 Mouse', price: 99, stock: 12, category: 'mouse', img: '/img/mouse.png' },
  { id: 3, name: 'USB-C 扩展坞', price: 159, stock: 0, category: 'hub', img: '/img/hub.png' },
  { id: 4, name: '罗技 mouse', price: 159, stock: 20, category: 'mouse', img: '/img/hub.jpg' },
  { id: 5, name: '微软 key', price: 159, stock: 0, category: 'keyboard', img: '/img/keyboard.png' },
  { id: 6, name: 'Type C Mouse', price: 159, stock: 30, category: 'mouse', img: '/img/type-c mouse.jpg' },
])

// 解构拿到所有状态
const { query:keyword, category, priceMax, desc, categories, sorted, doSearch } = useProductFilter(products)

// 新增：卡片选中id
const selectedId = ref(null)

// 页面加载回填草稿
keyword.value = localStorage.getItem('kw') || ''

// 草稿保存：query存入localStorage
watch(keyword, (newVal) => {
  localStorage.setItem('kw', newVal)
}, { immediate: true })
// 补充两个事件处理函数（onSearch、onReset）
function onSearch(kw) {
  doSearch(kw)
}
function onReset() {
  keyword.value = ''
}
function addToCart() {
  cartCount.value++
}
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap:16px;
}
</style>