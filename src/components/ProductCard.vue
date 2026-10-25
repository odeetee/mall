<script setup>
const props = defineProps({
  goods: { type: Object, required: true },
  // 修改加上selected
  selected: { type: Boolean, default: false }
})
</script>

<template>
  <!-- template根div -->
  <div class="product-card" :class="{active: selected}">
    <img :src="goods.img" :alt="goods.name" width="200px" height="200px"  />
    <h3>{{ goods.name }}</h3>
    <p class="price">¥{{ goods.price }}</p>
    <span :class="goods.stock > 0 ? 'on' : ''">{{ goods.stock > 0 ? '现货' : '缺货' }}</span>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #E3E6EB;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-media {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-card h3 {
  font-size: 15px;
  margin: 0;
  min-height: 40px;
}

.product-card .price {
  color: #E8442E;
  font-weight: bold;
  margin: 0;
}

.product-card .on {
  color: #16A34A;
}
/* 新增选中蓝色边框 */
.product-card.active {
  border: 2px solid #409eff;
}
</style>