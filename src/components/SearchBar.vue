<template>
<div class="toolbar">
    <input v-model.lazy.trim="keyword" @keyup.enter="doSearch" placeholder="搜索商品" />
    <button class="btn-search" @click="doSearch">搜索</button>
    <button class="btn-reset" @click="doReset">清空</button>
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

// 1. 声明向外抛出的事件
const emit = defineEmits(['search', 'reset'])

// 2. 四个双向绑定 model，和父组件传过来的 v-model 一一对应
const keyword = defineModel('keyword', { default:''})
const category = defineModel('category', { default:'all'})
const priceMax = defineModel('priceMax', { default: Infinity })
const desc = defineModel('desc', { default: false })

// 3. 搜索：回车 / 点搜索按钮共用
function doSearch() {
  emit('search', keyword.value)
}

// 4. 重置：点重置按钮
function doReset() {
  emit('reset')
}
</script>


<style scoped>
/* ========== 输入框 + 下拉 ========== */
.toolbar > input[placeholder="搜索商品"],
.toolbar select {
  height: 34px !important;
  padding: 0 10px !important;
  border: 1px solid #dcdfe6 !important;
  border-radius: 4px !important;
  font-size: 16px !important;
  box-sizing: border-box !important;
}
.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}
.cart {
  margin-left: auto;
  font-weight: bold;
}
.btn-search {
  background: #2563eb;
  color: #fff;
  border: none;       /* 去掉原生难看的边框 */
  border-radius: 4px; /* 小圆角，和PPT风格匹配 */
  padding: 6px 14px;  /* 上下左右内边距，按钮不会太挤 */
  cursor: pointer;    /* 鼠标放上去变成小手 */
}
/* 公共：两个按钮统一尺寸、圆角、去掉边框 */
.btn-search,
.btn-reset {
  border: none;
  border-radius: 4px;
  padding: 6px 16px;  /* 统一上下、左右内边距，控制按钮大小 */
  cursor: pointer;
  font-size: 16px;     /* 统一字号，避免文字不一样导致宽度不同 */
}

/* 搜索：PPT深蓝色 + 白字 */
.btn-search {
  background: #2563eb;
  color: #fff;
}

/* 重置：浅灰色底色 + 黑色字 */
.btn-reset {
  background: #e5e7eb;
  color: #111827;
}
</style>