<script setup>
const props = defineProps({
  goods: { type: Object, required: true },
  // 修改加上selected
  selected: { type: Boolean, default: false }
})
</script>

<!-- 第七周案例三：局部自定义指令 v-focus -->
<template>
  <div class="product-card" :class="{active: selected}">
    <!-- cover 具名插槽：图片区域，给默认图片 -->
    <slot name="cover">
      <img :src="goods.img" :alt="goods.name" width="200px" height="200px" />
    </slot>

    <!-- title 具名插槽：商品标题区域 -->
    <slot name="title">
      <h3>{{ goods.name }}</h3>
    </slot>

    <p class="price">¥{{ goods.price }}</p>

    <!-- 默认插槽：底部区域 -->
    <slot>
      <span>{{ goods.stock > 0 ? '现货' : '缺货' }}</span>
    </slot>
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